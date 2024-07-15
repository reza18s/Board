import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name || "",
      imageUrl: randomImage,
    });

    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.tokenIdentifier;

    let user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .unique();
    if (!user) {
      // @ts-ignore
      await ctx.db.insert("users", {
        name: identity.name || "",
        createdAt: `${new Date().getTime()}`,
        updatedAt: `${new Date().getTime()}`,
        email: identity.email!,
        role: "user",
        favorites: [],
        // @ts-ignore
        orgId: identity.org_Id,
        // @ts-ignore
        org_role: identity.org_role,
        tokenIdentifier: identity.tokenIdentifier,
      });
      user = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
        .unique();
    }
    if (!user) {
      throw new Error("user not exist in database");
    }
    const isFavorite = user?.favorites.map((el) => el.boardId === args.id);
    if (isFavorite) {
      const newFavorite = user?.favorites.filter(
        (fav) => fav.boardId !== args.id,
      );
      await ctx.db.patch(user!._id, {
        favorites: newFavorite,
      });
    }

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const title = args.title.trim();

    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 60) {
      throw new Error("Title cannot be longer than 60 characters");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.tokenIdentifier;

    let user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .unique();
    if (!user) {
      if (!user) {
        // @ts-ignore
        await ctx.db.insert("users", {
          name: identity.name || "",
          createdAt: `${new Date().getTime()}`,
          updatedAt: `${new Date().getTime()}`,
          email: identity.email!,
          role: "user",
          favorites: [],
          // @ts-ignore
          orgId: identity.org_Id,
          // @ts-ignore
          org_role: identity.org_role,
          tokenIdentifier: identity.tokenIdentifier,
        });
        user = await ctx.db
          .query("users")
          .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
          .unique();
      }
    }
    if (!user) {
      throw new Error("user not exist in database");
    }
    const existingFavorite = user?.favorites.find((el) => {
      return el.boardId === board._id;
    });

    if (existingFavorite) {
      throw new Error("Board already favorited");
    }

    await ctx.db.patch(user!._id, {
      favorites: [
        ...user!.favorites,
        { boardId: board._id, org_id: args.orgId },
      ],
    });

    return board;
  },
});

export const unfavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.tokenIdentifier;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .unique();
    if (!user) {
      throw new Error("user not exist in database");
    }
    const isFavorite = user.favorites.map((el) => el.boardId === args.id);
    if (isFavorite) {
      const newFavorite = user?.favorites.filter(
        (fav) => fav.boardId !== args.id,
      );
      await ctx.db.patch(user._id, {
        favorites: newFavorite,
      });
    }
  },
});

export const get = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);

    return board;
  },
});
