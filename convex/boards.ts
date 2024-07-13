import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

import { mutation } from "./_generated/server";

const IMAGES = [
  "../public/placeholders/1.svg",
  "../public/placeholders/2.svg",
  "../public/placeholders/3.svg",
  "../public/placeholders/4.svg",
  "../public/placeholders/5.svg",
  "../public/placeholders/6.svg",
  "../public/placeholders/7.svg",
  "../public/placeholders/1.svg",
  "../public/placeholders/9.svg",
  "../public/placeholders/10.svg",
];
export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
    // search: v.optional(v.string()),
    // favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    const board = await ctx.db.insert("boards", {
      title: args.title,
      imageUrl: randomImage,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name || "",
    });
    // if (args.favorites) {
    //   const favoritedBoards = await ctx.db
    //     .query("userFavorites")
    //     .withIndex("by_user_org", (q) =>
    //       q.eq("userId", identity.subject).eq("orgId", args.orgId),
    //     )
    //     .order("desc")
    //     .collect();

    //   const ids = favoritedBoards.map((b) => b.boardId);

    //   const boards = await getAllOrThrow(ctx.db, ids);

    //   return boards.map((board) => ({
    //     ...board,
    //     isFavorite: true,
    //   }));
    // }

    // const title = args.search as string;
    // let boards = [];

    // if (title) {
    //   boards = await ctx.db
    //     .query("boards")
    //     .withSearchIndex("search_title", (q) =>
    //       q.search("title", title).eq("orgId", args.orgId),
    //     )
    //     .collect();
    // } else {
    //   boards = await ctx.db
    //     .query("boards")
    //     .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
    //     .order("desc")
    //     .collect();
    // }

    // const boardsWithFavoriteRelation = boards.map((board) => {
    //   return ctx.db
    //     .query("userFavorites")
    //     .withIndex("by_user_board", (q) =>
    //       q.eq("userId", identity.subject).eq("boardId", board._id),
    //     )
    //     .unique()
    //     .then((favorite) => {
    //       return {
    //         ...board,
    //         isFavorite: !!favorite,
    //       };
    //     });
    // });

    // const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation);

    // return boardsWithFavoriteBoolean;
  },
});
