import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url, hidden) {
    if (!this.userId) {
      throw new Meteor.error('not-authorized', 'Not authorized.');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url,
      },
    }).validate({ url });

    if (hidden === undefined) {
      hidden = false;
    }

    Links.insert({
      _id: shortid.generate(),
      visits: 0,
      lastvisit: 0,
      hidden,
      url,
      userId: this.userId,
    });
  },
  'links.toggleHide'(_id, hidden) {
    if (!this.userId) {
      throw new Meteor.error('not-authorized', 'Not authorized.');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      hidden: {
        type: Boolean,
      },
    }).validate({ _id, hidden });

    Links.update(_id, {
      $set: { hidden },
    });
  },
  'links.delete'(_id) {
    Links.remove({ _id });
  },

  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({ _id });

    Links.update({ _id }, {
      $set: {
        lastvisit: new Date().getTime(),
      },
      $inc: {
        visits: 1,
      },
    });
  },
});
