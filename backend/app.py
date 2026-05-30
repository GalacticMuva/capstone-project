import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor 

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app) # Allows React and n8n to connect safely

# DATABASE CONFIGURATION (Pulled safely via Environment Variables for AWS compatibility)
DB_USER = os.getenv('DB_USER', 'your_user')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'your_password')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'your_db_name')

# Establish a fresh connection to the PostgreSQL database
def get_db_connection():
    conn = psycopg2.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME
    )
    return conn

# INITIALIZATION: Create the 'product' table if it doesn't exist
def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS product (
            id SERIAL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            quantity INTEGER NOT NULL
        );
    ''')
    conn.commit()
    cur.close()
    conn.close()

# Initialize the database  on start
try:
    init_db()
except Exception as e:
    print(f"Database initialization warning (will retry on requests): {e}")

# --- FRONTEND ROUTES  ---
@app.route('/')
def index():
    return render_template('index.html')


# --- API ENDPOINTS  ---

# 1. CREATE: Insert a new product
@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.get_json()
    
    if not data or not all(k in data for k in ('name', 'price', 'quantity')):
        return jsonify({"error": "Missing required fields"}), 400
        
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            'INSERT INTO product (name, price, quantity) VALUES (%s, %s, %s) RETURNING *;',
            (data['name'], data['price'], data['quantity'])
        )
        
        new_product = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
        # Decimal price --> float
        new_product['price'] = float(new_product['price'])
        return jsonify(new_product), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 2. READ: List all products
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute('SELECT * FROM product ORDER BY id ASC;')
        products = cur.fetchall()
        
        cur.close()
        conn.close()
        
        # prices converted
        for p in products:
            p['price'] = float(p['price'])
            
        return jsonify(products), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 3. UPDATE: Edit existing product details 
@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # SQL update statement
        fields = []
        values = []
        for key in ['name', 'price', 'quantity']:
            if key in data:
                fields.append(f"{key} = %s")
                values.append(data[key])
                
        if not fields:
            return jsonify({"error": "No valid fields to update"}), 400
            
        values.append(product_id)
        sql_query = f"UPDATE product SET {', '.join(fields)} WHERE id = %s RETURNING *;"
        
        cur.execute(sql_query, tuple(values))
        updated_product = cur.fetchone()
        
        if not updated_product:
            cur.close()
            conn.close()
            return jsonify({"error": "Product not found"}), 404
            
        conn.commit()
        cur.close()
        conn.close()
        
        updated_product['price'] = float(updated_product['price'])
        return jsonify(updated_product), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # Local port fallback;
    app.run(host='0.0.0.0', port=5000, debug=True)