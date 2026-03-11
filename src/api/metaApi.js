import axios from 'axios';

const POC_ENDPOINT = 'http://localhost/api/v1/gateway/messenger/poc';

/**
 * Send a message to the Messenger POC gateway.
 * - Text only  → JSON  { user_id, shop_id, text }
 * - With file  → multipart/form-data  (image attached as "image")
 * @param {{ user_id: string, shop_id: string, text?: string, imageFile?: File }} payload
 */
export const sendPocMessage = ({ user_id, shop_id, text, imageFile }) => {
  if (imageFile) {
    const form = new FormData();
    form.append('user_id', user_id);
    form.append('shop_id', shop_id);
    if (text) form.append('text', text);
    form.append('image', imageFile);
    return axios.post(POC_ENDPOINT, form);
  }
  return axios.post(POC_ENDPOINT, { user_id, shop_id, text }, {
    headers: { 'Content-Type': 'application/json' },
  });
};
