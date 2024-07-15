import { v } from "convex/values";
import { mutation } from "./_generated/server";
export const store = mutation({
  args: { email: v.string() },
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    return await ctx.db.insert("users", {
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
  },
});
