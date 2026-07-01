# ระบบแจ้งเหตุเพลิงไหม้ 🔥

โปรเจกต์นี้เป็นระบบต้นแบบสำหรับตรวจจับควัน เปลวไฟ และแจ้งเตือนให้ทราบ โดยแยกเป็นส่วน frontend (UI) และ backend (API/บริการ) เพื่อให้ง่ายต่อการพัฒนาและขยาย

## 📋 คุณสมบัติหลัก

- ✅ ตรวจจับควันและเปลวไฟในแบบเรียลไทม์
- ✅ ส่งการแจ้งเตือนทันทีเมื่อเกิดเหตุการณ์อันตราย
- ✅ แสดงประวัติการแจ้งเตือนย้อนหลัง
- ✅ รองรับการใช้งานบนมือถือและเดสก์ท็อป
- ✅ อินเตอร์เฟซที่ใช้งานง่ายและเข้าใจได้

---

## 🏗️ โครงสร้างโปรเจกต์ (แยก Frontend / Backend)

โปรเจกต์แบ่งเป็น 2 ส่วนหลัก: Frontend (Next.js) และ Backend (API/บริการ) เพื่อให้พัฒนาและ deploy แยกกันได้อย่างชัดเจน

Frontend (Next.js)

```
fire-alert-system/frontend/
├── app/
│   ├── page.tsx                 # หน้าแรก (Dashboard)
│   ├── layout.tsx               # Layout หลัก
│   ├── api/                     # (ถ้าใช้ Route Handlers ฝั่ง Next)
│   │   └── ...
│   └── dashboard/               # หน้าแสดงสถานะ
├── components/
│   ├── AlertBanner.tsx          # แสดงการแจ้งเตือน
│   ├── StatusDisplay.tsx        # แสดงสถานะ
│   ├── AlertHistory.tsx         # แสดงประวัติ
│   └── Navbar.tsx               # Navigation bar
├── lib/
│   ├── api.ts                   # ฟังก์ชัน API client
│   └── utils.ts                 # ฟังก์ชันทั่วไป
├── types/
│   └── index.ts                 # Type definitions
├── public/
│   └── images/                  # รูปภาพและไอคอน
├── package.json
├── tsconfig.json
└── next.config.js
```

Backend (API / Service)

```
Lab1/Backend/
├── app.js                       # entry point ของเซิร์ฟเวอร์
├── config/
│   └── index.js                 # การตั้งค่าต่าง ๆ
├── models/
│   ├── alert.js                 # โมเดลข้อมูลการแจ้งเตือน
│   └── systemStatus.js          # โมเดลข้อมูลสถานะระบบ
├── routes/
│   ├── alerts.js                # API สำหรับการแจ้งเตือน
│   ├── history.js               # API สำหรับประวัติ
│   └── status.js                # API สำหรับสถานะ
├── service/
│   └── alertService.js          # โลจิกการจัดการแจ้งเตือน
├── response/
│   └── response.js              # helper สำหรับ response
├── package.json
├── package-lock.json
└── node_modules/
```

---

## 🛠️ เทคโนโลยีที่ใช้

| ส่วนประกอบ | เทคโนโลยี |
|-----------|----------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **UI Components** | React |
| **Styling** | Tailwind CSS / CSS Modules |
| **API** | Next.js Route Handlers |
| **Database** | MongoDB / PostgreSQL (หรือที่เหมาะสม) |
| **Deployment** | Vercel / Node.js Server |
| **Package Manager** | npm / pnpm |

---

## 🚀 ขั้นตอนเริ่มต้นสำหรับ Next.js

### 1. สร้างโปรเจกต์ Next.js ใหม่

```bash
# ถ้ายังไม่มีโปรเจกต์
npx create-next-app@latest fire-alert-system --typescript

# หรือถ้ามีอยู่แล้ว ให้สถาปนาโปรเจกต์ใหม่
cd fire-alert-system
npm install
```

### 2. โครงสร้างไฟล์เริ่มต้น

สร้างโฟลเดอร์ตามโครงสร้างข้างต้น:

```bash
mkdir -p app/api/{alerts,status,history}
mkdir -p components
mkdir -p lib
mkdir -p types
mkdir -p public/images
```

### 3. สร้าง API Routes สำหรับ Backend

#### สร้าง API สำหรับสถานะ (`app/api/status/route.ts`):

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // ดึงข้อมูลสถานะจากฐานข้อมูล
    const status = {
      smokeDetected: false,
      fireDetected: false,
      lastUpdated: new Date().toISOString(),
    };
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch status' },
      { status: 500 }
    );
  }
}
```

#### สร้าง API สำหรับการแจ้งเตือน (`app/api/alerts/route.ts`):

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // ดึงข้อมูลการแจ้งเตือน
    const alerts = [
      {
        id: 1,
        message: 'ตรวจพบควัน',
        severity: 'high',
        timestamp: new Date().toISOString(),
      },
    ];
    return NextResponse.json(alerts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // บันทึกการแจ้งเตือนใหม่
    return NextResponse.json({ success: true, data: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    );
  }
}
```

#### สร้าง API สำหรับประวัติ (`app/api/history/route.ts`):

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // ดึงประวัติการแจ้งเตือน
    const history = [
      // ข้อมูลประวัติจากฐานข้อมูล
    ];
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
```

### 4. สร้าง Components

#### StatusDisplay Component (`components/StatusDisplay.tsx`):

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function StatusDisplay() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // อัปเดตทุก 5 วินาที

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>กำลังโหลด...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">สถานะระบบ</h2>
      <div className="space-y-2">
        <p>
          ควัน:{' '}
          <span className={status?.smokeDetected ? 'text-red-600' : 'text-green-600'}>
            {status?.smokeDetected ? 'ตรวจพบ' : 'ปกติ'}
          </span>
        </p>
        <p>
          เปลวไฟ:{' '}
          <span className={status?.fireDetected ? 'text-red-600' : 'text-green-600'}>
            {status?.fireDetected ? 'ตรวจพบ' : 'ปกติ'}
          </span>
        </p>
      </div>
    </div>
  );
}
```

#### AlertBanner Component (`components/AlertBanner.tsx`):

```typescript
'use client';

export interface Alert {
  id: number;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

interface AlertBannerProps {
  alert: Alert | null;
}

export default function AlertBanner({ alert }: AlertBannerProps) {
  if (!alert) return null;

  const bgColor = alert.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500';

  return (
    <div className={`${bgColor} text-white p-4 text-center font-bold`}>
      🚨 {alert.message}
    </div>
  );
}
```

### 5. รันโหมดพัฒนา

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

### 6. คำสั่งที่ใช้บ่อย

```bash
# ติดตั้ง dependencies
npm install

# รันโหมดพัฒนา (hot reload)
npm run dev

# สร้าง production build
npm run build

# รันหลัง build (production mode)
npm start

# ตรวจสอบ syntax และ style
npm run lint

# ตรวจสอบ type (TypeScript)
npx tsc --noEmit
```

---

## 🔗 การเชื่อมต่อ Frontend - Backend

### ขั้นตอนการเชื่อมต่อ:

1. **Frontend (Next.js Client)** ส่งคำขอถึง API endpoint
2. **Backend (API Routes)** ประมวลผลคำขอและดึงข้อมูล
3. **Database** เก็บและส่งคืนข้อมูล
4. **Frontend** แสดงผลข้อมูลบนหน้าเว็บ

### ตัวอย่างการโคลล์ API ใน React Component:

```typescript
// ดึงข้อมูล
const response = await fetch('/api/status');
const data = await response.json();

// ส่งข้อมูล
const response = await fetch('/api/alerts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: 'Fire detected', severity: 'high' }),
});
```

### Real-time Updates:

- ใช้ Polling: ดึงข้อมูลอย่างสม่ำเสมอ (5-10 วินาที)
- ใช้ WebSocket: เชื่อมต่อแบบสองทาง (ไม่รวมในเวอร์ชันปัจจุบัน)
- ใช้ Server-Sent Events (SSE): สตรีมข้อมูลจากเซิร์ฟเวอร์

---

## 🧪 การพัฒนาและทดสอบ

### ตรวจสอบ Frontend:

```bash
# รันในโหมดพัฒนา
npm run dev

# ตรวจสอบไวยากรณ์และรูปแบบ
npm run lint

# ประเมิน TypeScript
npx tsc --noEmit
```

### ทดสอบ API:

ใช้ **Postman** หรือ **cURL** เพื่อทดสอบ API:

```bash
# GET สถานะ
curl http://localhost:3000/api/status

# POST การแจ้งเตือน
curl -X POST http://localhost:3000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{"message":"Test alert","severity":"high"}'

# GET ประวัติ
curl http://localhost:3000/api/history
```

### ทดสอบบนมือถือ:

```bash
# หาที่อยู่ IP ของเครื่องพัฒนา
ipconfig

# เปิดเบราว์เซอร์บนมือถือ
# ไปที่ http://<IP>:3000
```

### Performance Check:

- ใช้ Chrome DevTools (F12) เพื่อตรวจสอบ Network และ Performance
- ตรวจสอบว่าการอัปเดตสถานะเกิดขึ้นภายใน 3 วินาที (ตามข้อกำหนด)

---

## 📝 สิ่งที่ต้องจำ

✅ **ก่อนส่งงาน:**
- รัน `npm run build` เพื่อตรวจสอบว่า build ผ่าน
- รัน `npm run lint` เพื่อตรวจสอบ syntax
- ทดสอบบนทั้ง Desktop และ Mobile

✅ **การพัฒนาต่อ:**
- เพิ่ม Unit Tests (Jest)
- เพิ่ม Integration Tests
- ตั้งค่า CI/CD Pipeline
- ปรับปรุง UI/UX ตามข้อเสนอแนะ

✅ **ความปลอดภัย:**
- ตรวจสอบ Input Validation ทั้งฝั่ง Frontend และ Backend
- ใช้ Authentication หากจำเป็น
- เก็บข้อมูลลับใน Environment Variables

---

## 📚 อ้างอิง

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**โปรเจกต์นี้ยังอยู่ในขั้นตอนพัฒนา (Prototype) 🚧**
