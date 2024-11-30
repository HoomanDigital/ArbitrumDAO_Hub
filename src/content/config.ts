import { ambassadors, contributions, events } from "@/data/schema/community";
import { Grants } from "@/data/schema/grant-hub";
import { homepage } from "@/data/schema/homepage";
import { wg } from "@/data/schema/workspaces";
import { defineCollection, reference, z } from "astro:content";

const blogs = defineCollection({
  type: "content",
  schema: ({ image }) => {
    return z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      label: z.string().optional(),
      tag: z.string(),
      pubDate: z.date(),
      author: reference("authors").optional(),
      externalUrl: z.string().optional(),
    });
  },
});

const ambassadorsHome = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),

    description: z.string(),
    buttons: z.array(
      z.object({
        text: z.string(),
        link: z.string(),
        type: z.union([z.literal("default"), z.literal("secondary")]),
      }),
    ),
  }),
});

const jobs = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      subTitle: z.string().optional(),
      description: z.string().optional(),
      link: z.string().optional(),
    })
    .refine((data) => {
      if (
        data.title !== "no_data_available" &&
        !data.subTitle &&
        !data.description &&
        !data.link
      ) {
        return false;
      }
      return true;
    }),
});

const bounties = defineCollection({
  type: "content",
  schema: ({ image }) => {
    return z
      .object({
        title: z.string().optional(),

        description: z.string().optional(),
        link: z.string().optional(),
        reward: z.number().optional(),
        date: z.date().optional(),
        level: z
          .union([
            z.literal("beginner"),
            z.literal("intermediate"),
            z.literal("advanced"),
          ])
          .optional(),
      })
      .refine((data) => {
        if (
          data.title !== "no_data_available" &&
          !data.description &&
          !data.link &&
          !data.reward &&
          !data.date
        ) {
          return false;
        }
        return true;
      });
  },
});

const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

const collaborations = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      subTitle: z.string().optional(),
      description: z.string().optional(),
      date: z.date().optional(),
    })
    .refine((data) => {
      if (
        data.title !== "no_data_available" &&
        !data.subTitle &&
        !data.description &&
        !data.date
      ) {
        return false;
      }
      return true;
    }),
});

const meetings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.union([z.literal("transcript"), z.literal("notes")]),
    recordingUrl: z.string().optional(),
  }),
});

const press = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      label: z.string().optional(),
      description: z.string().optional(),
      tag: z.string(),
      image: image().optional(),
      externalUrl: z.string(),
    }),
});

export const incentive = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      type: z
        .union([
          z.literal("Grant"),
          z.literal("Home"),
          z.literal("Incentive-Home"),
        ])
        .optional(),
      title: z.string(),
      description: z.string().optional(),
      externalUrl: z.string().optional(),
      buttons: z
        .array(
          z.object({
            text: z.string(),
            link: z.string(),
            type: z.union([z.literal("default"), z.literal("secondary")]),
          }),
        )
        .optional(),
      discussions: z
        .array(
          z.object({
            title: z.string(),
            externalUrl: z.string(),
            description: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

export const proposalHubForum = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      createdAt: z.date(),
      cta: z
        .object({
          label: z.string(),
          link: z.string(),
        })
        .optional(),

      status: z.string().optional(),
      domain: z.string().optional(),
    }),
});

export const wgProjects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      tag: z.string(),
      status: z.string().optional(),
      type: z
        .object({
          discriminant: z.union([z.literal("wg"), z.literal("community")]),
          value: z.union([
            reference("Working_Groups"),
            z.literal("contributions"),
          ]),
        })
        .optional(),
      externalUrl: z.string().optional(),
      image: image().optional(),
    }),
});

const grantUpdates = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      label: z.string().optional(),
      description: z.string(),
      image: image().optional(),
      type: z.string().optional(),
      externalUrl: z.string().optional(),
    }),
});

const Gallery = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      type: z
        .object({
          discriminant: z.union([
            z.literal("community"),
            z.literal("ambassadors"),
          ]),
          value: z.union([
            reference("Community_Ambassadors"),
            z.literal("community"),
          ]),
        })
        .optional(),
      image: image().optional(),
      externalUrl: z.string().optional(),
    }),
});

export const collections = {
  blogs,
  homepage,
  Community_Contributions: contributions,
  Community_Collaborations: collaborations,
  Community_Events: events,
  Community_Bounties: bounties,
  Community_Ambassadors_Homepage: ambassadorsHome,
  Community_Ambassadors: ambassadors,
  Community_Jobs: jobs,
  Community_Meetings: meetings,
  authors,
  Working_Groups: wg,
  press,
  Grant_Hub: Grants,
  Incentive_Programs: incentive,
  Proposal_Hub_Forum: proposalHubForum,
  Projects: wgProjects,
  Updates: grantUpdates,
  Gallery: Gallery,
};
