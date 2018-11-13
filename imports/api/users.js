import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  const name = user.profile.name.trim();

  new SimpleSchema({
    name: {
      type: String,
      min: 1,
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
  }).validate({ name, email });

  return true;
});
