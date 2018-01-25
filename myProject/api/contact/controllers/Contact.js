'use strict';

/**
 * Contact.js controller
 *
 * @description: A set of functions called "actions" for managing `Contact`.
 */

module.exports = {

  /**
   * Retrieve contact records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.contact.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a contact record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    const data = await strapi.services.contact.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an contact record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.contact.add(ctx.request.body);
    const { client, orderId, message } = ctx.request.body;
    //console.strapi.info(ctx.request.body);
    const template = `
      <p>${orderId}</p>
      <p>From ${client}</p>
      <p>But don’t worry! You can use the following link to reset your password:</p>

      <p>${message}</p>

      <p>Thanks.</p>
    `;

    try {
      await strapi.plugins['email'].services.email.send({
        to: 'marta.jareckaa@gmail.com',
        subject: '­Contact',
        text: template,
        html: template
      });
    } catch (err) {
      return ctx.badRequest(null, err);
      strapi.log.info(err);
    }

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an contact record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.contact.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an contact record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.contact.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
