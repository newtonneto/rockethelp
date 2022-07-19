export interface OrderModel {
  id: string;
  patrimony: string;
  when: string;
  status: "open" | "closed";
}
