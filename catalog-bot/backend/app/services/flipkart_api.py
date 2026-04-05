import asyncio
import uuid

async def mock_update_flipkart_inventory(sku: str, stock_remaining: int) -> dict:
    """
    Simulates making a PUT call to the Flipkart Seller API to update inventory values.
    """
    print(f"🔄 Executing Flipkart API Sync for SKU: {sku} -> Setting stock to {stock_remaining}")
    # Simulating API network delay
    await asyncio.sleep(1.0)
    
    return {
        "status": "SUCCESS",
        "sku": sku,
        "transaction_id": str(uuid.uuid4())
    }

def build_flipkart_listing_payload(sku: str, ai_data: dict, pricing_data: dict) -> dict:
    """
    Constructs the Flipkart API JSON Listing format.
    Simplified for mock demonstration purposes.
    """
    return {
        "sku": sku,
        "product_details": {
            "name": ai_data.get("title", "New Product"),
            "description": ai_data.get("description", ""),
            "bullet_points": ai_data.get("bullet_points", []),
        },
        "pricing": {
            "mrp": pricing_data.get("suggested_price", 0.0) + (pricing_data.get("suggested_price", 0.0) * 0.2), # MRP generally higher
            "selling_price": pricing_data.get("suggested_price", 0.0),
            "currency": "INR",
        },
        "inventory": {
            "stock": 10
        }
    }

async def mock_submit_listing_to_flipkart(payload: dict, credentials_token: str) -> dict:
    """
    Simulates making a POST call to the Flipkart Seller API.
    """
    await asyncio.sleep(2.0)
    
    return {
        "sku": payload.get("sku"),
        "status": "SUCCESS",
        "listing_id": "FSKU-" + str(uuid.uuid4())[:8].upper(),
        "errors": []
    }
