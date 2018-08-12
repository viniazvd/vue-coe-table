export const trColStyle = { 'background-color': '#E7E9F0' }
export const thColStyle = { 'color': '#5E6784', 'min-width': '100px' }
export const trRowStyle = { 'border': '1px solid #E7E9F0' }
export const tdRowStyle = { 'text-align': 'center' }
export const rowStyle = { 'color': '#5E6784' }
export const totalStyle = { 'color': '#5E6784', 'background-color': '#E7E9F0' }

export const cols = [
  { label: 'Nome', row: 'name', sortable: { all: true, one: true } },
  { label: 'E-mail', row: 'email' },
  { label: 'Idade', row: 'age', sortable: { one: true }, hasTotal: true },
  { label: 'Malícia', row: 'malice', sortable: { all: true }, hasTotal: true }
]

export const rows = [
  { name: 'coe1', email: 'coe1.mane@gmail.com', age: 6 },
  { name: 'coe2', email: 'coe2.mane@gmail.com', age: 3, malice: 3 },
  { name: 'coe3', email: 'coe3.mane@gmail.com', age: 2 },
  { name: 'coe4', email: 'coe4.mane@gmail.com', age: 1, malice: 10 }
]
export const total = { enable: true, label: 'Total', colPosition: 'email' }