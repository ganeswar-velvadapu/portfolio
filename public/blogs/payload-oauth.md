# OAuth in Payload CMS (Google, No Third-Party Auth)

## Prerequisites

* Good understanding of the OAuth 2.0 framework
* Familiarity with Payload CMS and Next.js App Router

This guide explains how to implement **Google OAuth for the Payload Admin panel** without using any third-party authentication services. The goal is to completely replace the default email/password login UI with a **Sign in with Google** flow, while still using Payload’s built-in authentication internally.

---

## Step 1: Replace the Default Admin Login Page

When you create a Payload app using any template (blank, website, etc.), Payload ships with a default admin login page at:

```bash
/admin/login
```

This page contains email and password fields. Our goal is to **remove this UI entirely** and replace it with a custom login page that only shows a **Sign in with Google** button.

Instead of modifying the existing `/admin/login` page, the cleanest approach is to **define a custom admin login route**.

### Configure a Custom Admin Login Route

1. Open `payload.config.ts`
2. Inside `buildConfig`, locate the `admin` section
3. Add the following configuration:

```ts
routes: {
  login: '/auth/login',
}
```

Important note:

* Do **not** include `/admin` in this path
* Payload automatically prefixes `/admin`
* Writing `/admin/auth/login` here would result in `/admin/admin/auth/login`

With this configuration:

* Visiting `/admin` redirects to `/admin/auth/login`
* The default `/admin/login` page is no longer used

### Create the Custom Login Page

Create the following file:

```bash
src/app/admin/auth/login/page.tsx
```

This page should contain a button that initiates Google OAuth.

Example button handler:

```ts
const loginWithGoogle = () => {
  window.location.href = '/api/auth/google'
}
```

Attach this function to the button’s `onClick` handler.

At this point:

* `/admin` redirects to `/admin/auth/login`
* Users only see a Google login button

---

## Step 2: Create Google OAuth Credentials

In Google Cloud Platform:

1. Create an OAuth 2.0 Client
2. Configure the consent screen
3. Set the redirect URI to:

```bash
/api/auth/google/callback
```

You will receive the following credentials:

* `GOOGLE_CLIENT_ID`
* `GOOGLE_CLIENT_SECRET`
* `GOOGLE_REDIRECT_URI`

Add them to your `.env` file.

---

## Step 3: Prepare the Users Collection

Payload **cannot fully remove passwords** from an auth-enabled collection, even when using OAuth. This is an important design detail.

Key points:

* The password field does not need to be exposed in the admin UI
* Payload still requires a password internally to create a session

You may:

* Keep the password field hidden
* Or let Payload manage it programmatically

Both approaches work.

---

## Step 4: Start the OAuth Flow

When the user clicks **Sign in with Google**, the browser should redirect to:

```bash
/api/auth/google
```

This route is responsible for redirecting the user to Google’s OAuth consent screen.

---

## Step 5: Google OAuth Entry Route

Create the following route:

```bash
src/app/api/auth/google/route.ts
```

Implementation:

```ts
import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function GET() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )

  const url = client.generateAuthUrl({
    scope: ['openid', 'email', 'profile'],
  })

  return NextResponse.redirect(url)
}
```

Flow so far:

1. User clicks Google button
2. Browser redirects to `/api/auth/google`
3. User selects a Google account
4. Google redirects back to the callback URL

---

## Step 6: Google OAuth Callback

Create the callback route:

```bash
src/app/api/auth/google/callback/route.ts
```

This route handles authentication, authorization, and session creation.

### Capture the Authorization Code

```ts
const { searchParams } = new URL(req.url)
const code = searchParams.get('code')
```

### Exchange Code for Tokens

```ts
const client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

const { tokens } = await client.getToken(code)
```

### Extract the User Profile

```ts
const ticket = await client.verifyIdToken({
  idToken: tokens.id_token!,
  audience: process.env.GOOGLE_CLIENT_ID,
})

const profile = ticket.getPayload()
```

Validate the profile:

```ts
if (!profile?.email) {
  return NextResponse.redirect(new URL('/admin/auth/login', req.url))
}
```

---

## Step 7: Authorize the User

In this example, **only pre-existing users are allowed** to log in.

```ts
const existing = await payload.find({
  collection: 'users',
  where: {
    email: { equals: profile.email },
  },
})

if (existing.docs.length === 0) {
  return NextResponse.redirect(
    new URL('/admin/auth/login?error=unauthorized', req.url)
  )
}
```

You may replace this logic with `payload.create()` if you want to allow new users.

---

## Step 8: Generate and Update Password

Payload requires a password to create an authenticated session.

Generate a secure random password:

```ts
const password = crypto.randomBytes(32).toString('hex')
```

Update the user record:

```ts
await payload.update({
  collection: 'users',
  id: existing.docs[0].id,
  data: { password },
})
```

This approach:

* Generates a new password on every login
* Keeps credentials internal
* Avoids exposing passwords to users

---

## Step 9: Authenticate with Payload

Payload exposes a login endpoint:

```bash
/api/users/login
```

Authenticate the user:

```ts
const origin = new URL(req.url).origin

const loginRes = await fetch(`${origin}/api/users/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    email: profile.email,
    password,
  }),
})

if (!loginRes.ok) {
  throw new Error('Payload login failed')
}
```

### Forward Session Cookies

Because this request runs on the server, cookies must be manually forwarded to the browser:

```ts
const response = NextResponse.redirect(new URL('/admin', req.url))

const setCookie = loginRes.headers.get('set-cookie')
if (setCookie) {
  response.headers.set('set-cookie', setCookie)
}

return response
```

This step is critical. Without forwarding the `Set-Cookie` header, the admin panel will not recognize the authenticated session.

---

## Final Result

* The admin login page shows only a Google login button
* Only authorized users can log in
* Payload Admin sessions work correctly
* No third-party authentication services are required

This completes a clean and fully controlled OAuth implementation in Payload CMS.

You can find an example repository here:  
[https://github.com/ganeswar-velvadapu/payload-oauth](https://github.com/ganeswar-velvadapu/payload-oauth)