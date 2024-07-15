import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
type IBoards = {
  _id: Id<"boards">;
  _creationTime: number;
  title: string;
  orgId: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  isFavorite?: boolean;
}[];
export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (args.favorites) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_token", (q) =>
          q.eq("tokenIdentifier", identity.tokenIdentifier),
        )
        .unique();
      if (!user) {
        throw new Error("user not found in the database");
      }

      const ids = user?.favorites.map((b) => b.boardId);
      if (!ids) {
        throw new Error("user dose not have any favorite");
      }

      const boards = await getAllOrThrow(ctx.db, ids);

      return {
        boards: boards.map((board) => ({
          ...board,
          isFavorite: true,
        })),
      };
    }

    const title = args.search as string;
    let boards: IBoards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId),
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (!user) {
      return { boards };
    }
    const existingFavorite: { boardId: Id<"boards">; org_id: string }[] = [];

    boards = boards.map((board) => {
      user.favorites.map(
        // @ts-ignore
        (el) =>
          board._id === el.boardId &&
          (board.isFavorite = true) &&
          existingFavorite.push({ boardId: el.boardId, org_id: el.org_id }),
      );
      return board;
    });
    if (existingFavorite.length !== user.favorites.length) {
      return { boards, existingFavorite };
    }

    return { boards };
  },
});
export const userUpdateFavorite = mutation({
  args: {
    favorites: v.array(
      v.object({
        boardId: v.id("boards"),
        org_id: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (!user) {
      return;
    }
    ctx.db.patch(user._id, {
      favorites: args.favorites,
    });
  },
});
