Pages = {};

Telescope.schemas.pages = new SimpleSchema({
  title: {
    type: String
  },
  slug: {
    type: String,
    optional: true
  },
  content: {
    type: String,
    autoform: {
      rows: 10
    }
  },
  order: {
    type: Number,
    optional: true
  }
});

Pages.collection = new Meteor.Collection('pages');

i18n.internationalizeSchema(Telescope.schemas.pages);

Pages.collection.attachSchema(Telescope.schemas.pages);

Pages.collection.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  if (!doc.slug)
    doc.slug = Telescope.utils.slugify(doc.title);
});

Telescope.modules.register("primaryNav", {
  template: "pagesMenu",
  order: 5
});

Telescope.modules.register("mobileNav", {
  template: 'pagesMenu',
  order: 5
});

Meteor.startup(function () {
  Pages.collection.allow({
    insert: Users.isAdminById,
    update: Users.isAdminById,
    remove: Users.isAdminById
  });

  Meteor.methods({
    insertPage: function(pageTitle, pageContent){
      return Feeds.insert({title: pageTitle, content: pageContent});
    }
  });
});