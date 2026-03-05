import requests

BASE_URL = "http://127.0.0.1:8000/api"

endpoints = [
    "/attendance/summary",
    "/attendance/by-date?date=2026-03-05",
    "/employees/"
]

print("Starting connectivity test for HRMS-Lite API...")
for ep in endpoints:
    url = BASE_URL + ep
    try:
        resp = requests.get(url)
        print(f"GET {url} -> {resp.status_code}")
        if resp.status_code == 404:
            print(f"  FAILED: Endpoint {ep} not found.")
    except Exception as e:
        print(f"GET {url} -> Error: {e}")
