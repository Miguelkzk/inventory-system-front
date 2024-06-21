const BASE_URL = 'http://127.0.0.1:3000'
export const PucharseOrderService = {
  getOrders: async () => {
    const response = await fetch(`${BASE_URL}/purchase_orders//`);
    const data = await response.json();
    return data;
  },
  getAttributes: async ()=>{
    const response = await fetch(`${BASE_URL}/purchase_orders/attributes_description`);
    const data = await response.json();
  return data
  }
}