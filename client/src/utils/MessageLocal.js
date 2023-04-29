/**
 * Store specific messages to local storage
 */
function saveMessage(chatId, msgId) {
  try {
    localStorage.setItem(chatId, msgId);
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
function isNewMessage(chatId, newMsgId) {
  try {
    if (newMsgId.length === 0) return false;

    const oldMsgId = localStorage.getItem(chatId);
    if (oldMsgId && oldMsgId === newMsgId) return false;
  } catch (_) {}
  return true;
}

const operations = {
  isNewMessage,
  saveMessage,
  deleteChat,
};

export default operations;
