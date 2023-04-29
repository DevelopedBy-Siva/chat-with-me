/**
 * Save messages to local storage
 */
function saveChat(chatId, chat) {
  try {
    localStorage.setItem(chatId, JSON.stringify(chat));
  } catch (_) {}
}

/**
 * Store specific messages to local storage
 */
function saveMessage(chatId) {
  try {
    // localStorage.setItem(chatId, JSON.stringify(chat));
  } catch (_) {}
}

/**
 * Delete chat from local storage
 */
function deleteChat(chatId) {
  try {
    localStorage.removeItem(chatId);
  } catch (_) {}
}

/**
 * Get messages from local storage
 */
function getChat(chatId) {
  let messages = {};
  try {
    const json = localStorage.getItem(chatId);
    messages = JSON.parse(json);
  } catch (_) {
    messages = {};
  }
  return messages;
}

const operations = {
  getChat,
  saveChat,
  saveMessage,
  deleteChat,
};

export default operations;
