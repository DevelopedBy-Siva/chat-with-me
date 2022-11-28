const express = require("express");

const route = express.Router();

/**
 * Update User Password
 */
route.put("/change-pswd", (req, resp) => {
  resp.send("change password");
});

/**
 * Change User Profile Pic
 */
route.put("/change-profile-pic", (req, resp) => {
  resp.send("change profile pic");
});

/**
 * Add new contact
 */
route.post("/add-contact", (req, resp) => {
  resp.send("add contact");
});

/**
 * Get user contacts
 */
route.get("/contacts", (req, resp) => {
  resp.send("contacts");
});

/**
 * Remove user contact
 */
route.delete("/contacts/:contactId", (req, resp) => {
  resp.send("delete contacts");
});

module.exports = route;
