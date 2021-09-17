//collection store : data store or branch name for multi branch
db.createCollection('stores', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',description:'store location branch',title:'stores',
			required: ['name', 'address', 'lat_long', 'created_at', 'updated_at', 'contact_name', 'contact_phone', 'is_ative'],
			properties: {
				name: {bsonType: 'string'},
				address: {bsonType: 'string'},
				lat_long: {bsonType: 'string'},
				created_at: {bsonType: 'date'},
				updated_at: {bsonType: 'date'},
				deleted_at: {bsonType: 'date'},
				contact_name: {bsonType: 'string'},
				contact_phone: {bsonType: 'string'},
				is_ative: {bsonType: 'string',  description:'value = 1 for is_active, 0 for non active'}
				}
			}
		}
	}
);
db.stores.createIndex(
 	{"name": 1},
 	{unique: true}
);

//collection inventory : data inventory stock in store_id or branch id for multi branch
db.createCollection('inventory', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',description:'data stock',title:'inventory',
			required: ['store', 'name', 'price', 'discount', 'qty_stock', 'qty_begbal', 'qty_sales', 'qty_purchase', 'qty_retur', 'created_at', 'updated_at', 'is_ative'],
			properties: {
				store: {bsonType: 'array',
					items: {
						required: ['id', 'name'],
				       	properties: {
				         	id: {bsonType: 'string',description:'store id'},
					       	name: {bsonType: 'string',description:'store name for reporting'},
				       }
					}
				},
				name: {bsonType: 'string'},
				price: {bsonType: 'int', minimum:0, description:'price of inventory item'},
				discount: {bsonType: 'int', minimum:0, description:'discount price of inventory item'},
				qty_stock: {bsonType: 'int', minimum:0, description:'qty real of stock'},
				qty_begbal: {bsonType: 'int', minimum:0, description:'qty for stok at beginning balance'},
				qty_sales: {bsonType: 'string', minimum:0, description:'qty for sum of sales order'},
				qty_purchase: {bsonType: 'string', minimum:0, description:'qty for sum of purchase order'},
				qty_retur: {bsonType: 'int', minimum:0, description:'qty for sum of return to supplier'},
				created_at: {bsonType: 'date'},updated_at: {bsonType: 'date'},
				deleted_at: {bsonType: 'date'},
				is_ative: {bsonType: 'string',  description:'value = 1 for is_active, 0 for non active'}
			}
		}
	}
});
db.inventory.createIndex(
 	{"store": 1, "name": 2},
 	{unique: true}
);

//collection inventory : data inventory_orders for entry all transaction item in, out stock in store_id or branch id for multi branch
db.createCollection('inventory_orders', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',description:'inventory order detail stock',title:'inventory_orders',
			required: ['date', 'trans_type', 'store', 'qty_detail', 'total_amount', 'created_at', 'updated_at'],
			properties: {
				date: {bsonType: 'date'},
				trans_type: {bsonType: 'string'},
				store: {bsonType: 'array',
					items: {
						required: ['id', 'name'],
				       	properties: {
				         	id: {bsonType: 'string',description:'store id'},
					       	name: {bsonType: 'string',description:'store name for reporting'},
				       }
					}
				},
				qty_detail: {bsonType: 'array',description:'detail of item qty list',
					items: {
						required: ['id', 'name', 'qty', 'price', 'discount'],
				       	properties: {
				       		id: {bsonType: 'string',description:'inventory id'},
				       		name: {bsonType: 'string',description:'inventory item name'},
				         	qty: {bsonType: 'int',description:'qty  item'},   	
				         	price: {bsonType: 'int',description:'price  item'},   	
				         	discount: {bsonType: 'int',description:'discount item'},   	
				       }
					}
				},
				total_amount: {bsonType: 'int', minimum:0, description:'total amount price of inventory item'},
				created_at: {bsonType: 'date'},updated_at: {bsonType: 'date'}
			}
		}
	}
});
db.inventory_orders.createIndex(
 	{"store": 1, "name": 2, "date": 3, "trans_type": 4},
 	{unique: true}
);

//collection sales : data sales order in store_id or branch id for multi branch by datetime
db.createCollection('sales', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',description:'data sales order',title:'sales',
			required: ['date', 'store_id', 'store_name', 'customer', 'order_detail', 'amount', 'amount_dicsount', 'amount_tax', 'amount_payment', 'table_no', 'created_at', 'updated_at', 'is_ative'],
			properties: {
				date: {bsonType: 'date'},
				store_id: {bsonType: 'string', description:'store id'},
				store_name: {bsonType: 'string', description:'store name'},
				customer: {bsonType: 'array',description:'customer name, phone',
					items: {
						required: ['name', 'phone'],
				       	properties: {
				       		name: {bsonType: 'string',description:'customer name'},
				         	phone: {bsonType: 'string',description:'customer phone'},   	
				       }
					}
				},
				order_detail: {bsonType: 'array',description:'detail of order list',
					items: {
						required: ['id', 'name', 'qty', 'price', 'discount'],
				       	properties: {
				       		id: {bsonType: 'string',description:'inventory id'},
				       		name: {bsonType: 'string',description:'inventory item name'},
				         	qty: {bsonType: 'int',description:'qty  item'},   	
				         	price: {bsonType: 'int',description:'price  item'},   	
				         	discount: {bsonType: 'int',description:'discount item'},   	
				       }
					}
				},
				amount: {bsonType: 'int', minimum:0, description:'amount of sum price detail order'},
				amount_dicsount: {bsonType: 'int', minimum:0, description:'amount discount'},
				amount_tax: {bsonType: 'int', minimum:0, description:'amount tax / pph'},
				amount_payment: {bsonType: 'int', minimum:0, description:'amount customer payment'},
				table_no: {bsonType: 'string', description:'location number of table'},
				created_at: {bsonType: 'date'},
				updated_at: {bsonType: 'date'},
				deleted_at: {bsonType: 'date'},
				is_ative: {bsonType: 'string',  description:'value = 1 for is_active, 0 for non active/cancel'}
			}
		}
	}
});
db.sales.createIndex(
 	{"store_id": 1, "date": 2},
 	{unique: true}
);
//sample insert data sales
db.sales.insertOne({
    date: new Date(),
    store_id: "store-1",
    store_name: "rumah makan padjajaran bogor",
    customer: [
	    	{
	        name: "kurnia",
	        phone: "0895"
	    }
	],
    order_detail: [
	    {
	        id: "001",
	        name: "tahu",
	        qty: NumberInt(2),
	        amount: NumberInt(5000),
	        discount: NumberInt(2000),
	    },
	    {
	        id: "002",
	        name: "tempe",
	        qty: NumberInt(3),
	        amount: NumberInt(10000),
	        discount: NumberInt(2000),
	    },
	],
	amount: NumberInt(40000),
	amount_dicsount: NumberInt(10000),
	amount_tax: NumberInt(0),
	amount_payment: NumberInt(30000),		
	table_no: "1",
	created_at : new Date(),
    updated_at : new Date(),
    is_active: "1"
});
db.sales.insertOne({
    date: new Date(),
    store_id: "store-1",
    store_name: "rumah makan padjajaran bogor",
    customer: [{
        name: "darmawan",
        phone: "0815"
    }],
    order_detail: [
	    {
	        id: "001",
	        name: "tahu",
	        qty: NumberInt(20),
	        amount: NumberInt(5000),
	        discount: NumberInt(2000),
	    },
	    {
	        id: "002",
	        name: "tempe",
	        qty: NumberInt(30),
	        amount: NumberInt(10000),
	        discount: NumberInt(2000),
	    },
	],
	amount: NumberInt(400000),
	amount_dicsount: NumberInt(1000000),
	amount_tax: NumberInt(0),
	amount_payment: NumberInt(300000),		
	table_no: "2",
	created_at : new Date(),
    updated_at : new Date(),
    is_active: "1"
});

/*
ide :
1. design database ini multi cabang dan atau multi rumah makan
2. menggunakan database mongodb menurut saya :
	- performance lebih stabil dan lebih bagus di banding mysql dan postgresql
	- jika menggunakan replikasi akan lebih baik lagi, karena proses penyimpanan datanya bisa lebih banyak node/slot dan
		jika node ke-1 mati, masih ada node lain lagi yang bisa menggantikan secara otomatis
		biasanya / disarankan ganjil 3, 5 node dst.
	- issue mode transactional database: default nya sistem penyimpanan data tidak bisa transaksional
		jika insert data ke 2 tabel misalnya ke tabel sale dan update tabel inventor
		jika ada satu yg gagal / error, tidak bisa di rollback
3. mengunakan format json proses query akan lebih cepat
4. di tabel inventory sudah di sediakan field untuk menambah stok ketika ada pembelian / proses produksi di qty_purchase
5. harga dan discount juga bisa di setting dari tabel inventory
6. tabel inventory belum di desain untuk custome discount seperti beli 2 gratis 1 dll.
7. di buat tabel masing - masing untuk transaksi pembelian, retur dll.

jawaban untuk :
Kebutuhan:
1. Aplikasi ini bisa memasukkan pesanan-pesanan makanan pelanggan : data disimpan di tabel 'orders'
2. Aplikasi ini bisa mengeluarkan struk pembelian : data disimpan di tabel 'orders' field json : order_detail
3. Aplikasi ini bisa mengeluarkan laporan penghasilan mingguan dan bulanan : data disimpan di tabel 'orders'
*/
db.sales.aggregate([
    {
        $match: { 
            "date": {
		        "$gte" : new Date("2021-09-13"),
		        "$lt": new Date("2021-09-19")
		    }
        }
    }, 
    {
        $project:
            {
                sid: "$store_id",
                amount_payment: "$amount_payment"
            }
        },
    {
        $group: { 
            _id: "$sid",
            TotalSum: { $sum: "$amount_payment" }
        } 
    } 
]);
/*
4. Aplikasi ini bisa mengeluarkan laporan stok : data disimpan di tabel 'inventory_orders'
output nya bisa summary group by store and name
atau detail stok op name per hari
field trans_type untuk mengetahui type transaksi untuk inventory tsb
filter by date, store, trans_type
nama barang, qty awal, qty pembelian, qty penjualan, qty retur, qty opname/adjustment, qty akhir 
*/

