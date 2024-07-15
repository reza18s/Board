import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),
  users: defineTable({
    name: v.optional(v.string()),
    tokenIdentifier: v.string(),
    email: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
    role: v.string(),
    orgId: v.optional(v.string()),
    org_role: v.optional(v.string()),
    favorites: v.array(
      v.object({
        boardId: v.id("boards"),
        org_id: v.string(),
      }),
    ),
  }).index("by_token", ["tokenIdentifier"]),
});
