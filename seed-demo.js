const bcrypt=require('bcryptjs'),db=require('./db');
const hash=p=>bcrypt.hashSync(p,10);
db.transaction(()=>{
 for(const t of ['audit_log','renewals','returns','issues','stock_adjustments','assets','quantity_stock','inventory_items','students','users','storage_locations'])db.prepare('DELETE FROM '+t).run();
 const coordinator=db.prepare('INSERT INTO users(username,password_hash,role,full_name) VALUES(?,?,?,?)').run('coordinator@dept.edu',hash('Coord@123'),'Coordinator','Department Coordinator').lastInsertRowid;
 const lab=db.prepare("INSERT INTO storage_locations(name,type,description) VALUES('DFIS Lab','laboratory','Development boards')").run().lastInsertRowid;
 const cupboard=db.prepare("INSERT INTO storage_locations(name,type,description) VALUES('Cupboard A','cupboard','Cables and adapters')").run().lastInsertRowid;
 const room=db.prepare("INSERT INTO storage_locations(name,type,description) VALUES('Equipment Room','room','Laptops')").run().lastInsertRowid;
 for(let n=1;n<=8;n++){const e='2026DFIS'+String(n).padStart(3,'0');const uid=db.prepare('INSERT INTO users(username,password_hash,role,full_name) VALUES(?,?,?,?)').run(e,hash('Student@123'),'Student','DFIS Student '+n).lastInsertRowid;db.prepare('INSERT INTO students(user_id,name,enrolment_number,programme,semester,email,phone) VALUES(?,?,?,?,?,?,?)').run(uid,'DFIS Student '+n,e,'M.Sc. DFIS',1,e.toLowerCase()+'@dept.edu','900000000'+n);}
 const board=db.prepare("INSERT INTO inventory_items(item_code,name,category,tracking_type,total_quantity,default_location_id) VALUES('DEV-BOARD','Development Board','Electronics','ASSET',10,?)").run(lab).lastInsertRowid;
 for(let n=1;n<=10;n++){const c=n===9?'Maintenance':n===10?'Damaged':'Usable';db.prepare('INSERT INTO assets(asset_id,item_id,serial_number,location_id,condition,status) VALUES(?,?,?,?,?,?)').run('DB-'+String(n).padStart(3,'0'),board,'SN-DB-'+n,lab,c,c==='Usable'?'Available':c);}
 for(const [code,name,cat,qty,loc] of [['USB-CABLE','USB Cable','Cables',20,cupboard],['ADAPTER','USB Adapter','Adapters',8,cupboard]]){const id=db.prepare('INSERT INTO inventory_items(item_code,name,category,tracking_type,total_quantity,default_location_id) VALUES(?,?,?, 'QUANTITY',?,?)').run(code,name,cat,qty,loc).lastInsertRowid;db.prepare('INSERT INTO quantity_stock(item_id,location_id,available) VALUES(?,?,?)').run(id,loc,qty);}
 const laptop=db.prepare("INSERT INTO inventory_items(item_code,name,category,tracking_type,total_quantity,default_location_id) VALUES('LAPTOP','Department Laptop','Computers','ASSET',2,?)").run(room).lastInsertRowid;
 for(let n=1;n<=2;n++)db.prepare('INSERT INTO assets(asset_id,item_id,serial_number,location_id,condition,status) VALUES(?,?,?,?,?,?)').run('LT-00'+n,laptop,'SN-LT-'+n,room,'Usable','Available');
 db.prepare("UPDATE settings SET value='' WHERE key='system_date_override'").run();
 db.prepare('INSERT INTO audit_log(timestamp,user_id,action,entity,details) VALUES(?,?,?,?,?)').run(new Date().toISOString().slice(0,10),coordinator,'SEED','system','{}');
})();
console.log('Seed complete. Coordinator: coordinator@dept.edu / Coord@123. Students: 2026DFIS001–008 / Student@123.');