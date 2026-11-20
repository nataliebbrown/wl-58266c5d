# Wholelicity — Refinement Checklist

- [x] Home
- [ ] Chat
- [x] Intro & Onboarding
- [ ] Curriculum
- [ ] Journal
- [ ] Scripture
- [ ] Scripture Study Tools (highlighting, verse interaction, image generation)
- [ ] Formation Hub & Daily Rhythms
- [ ] Journaling & Reflection
- [ ] Pattern Explorer / Constellation (toggleable)
- [ ] TimeWalk (toggleable)
- [ ] Journey
- [ ] Horizon
- [ ] Cross-Feature Connections
- [ ] Sophia's Role & Personality
    - [ ] Audible Sophia intro & tour
    - [ ] Change Sophia's voice in Settings
- [ ] Navigation & Wayfinding
- [ ] Search
- [ ] Notifications & Gentle Nudges
- [ ] Mobile & Responsive Experience
- [ ] Settings
- [ ] User Profile
- [ ] Login & Authentication
- [ ] Data Continuity Across Devices
- [ ] Light Mode Visual Language (typography pass, color pass, etc.)
- [ ] Dark Mode Visual Language
- [ ] Teaching UI (dark mode transition at night)
- [ ] Accessibility
- [ ] Set up ElevenLabs voice API
- [ ] Community (future vision)

Option B: Configure a custom SMTP provider (production-ready)                                                    
  In your Supabase dashboard:                                                                                      
  1. Go to Project Settings → Authentication → SMTP Settings                                                       
  2. Enable custom SMTP and enter credentials from a service like SendGrid, Resend, Postmark, or Mailgun           
  3. This gives you reliable email delivery with higher rate limits                                                
                                                                                                                   
  For the account you already created (natalie.breonah@gmail.com), you can manually confirm it right now:          
  1. Go to Authentication → Users in the Supabase dashboard                                                        
  2. Find the user                                                                                                 
  3. There should be an option to manually confirm the email  

   After that, the account you already created should be able to sign in immediately, and new signups won't be      
  blocked by unconfirmed emails.                                                                                   
                                                                                                                   
  Production reminder: Before launch, you'll need to:                                                              
  - Re-enable email confirmation in Supabase                                                                       
  - Set up a custom SMTP provider (SendGrid, Resend, Postmark, etc.) under Project Settings → Authentication → SMTP
   Settings so confirmation emails actually deliver reliably instead of relying on Supabase's rate-limited built-in
   mailer                                                                                                          
                                                                                                                   
  You may also want to manually confirm the natalie.breonah@gmail.com user in the Supabase dashboard               
  (Authentication → Users → find the user → confirm) if you want to test sign-in before toggling the setting. 
