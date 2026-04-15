# Libra Colf Design System

## Purpose
This document defines the visual and interaction system for the Libra Colf landing page and adjacent product-facing surfaces such as modals, transactional emails, and lightweight support flows.

The goal is consistency, not decoration. Libra Colf should feel:
- precise
- calm
- professional
- operational
- approachable for non-experts

It should never feel:
- flashy
- startup-generic
- overly playful
- overly enterprise-heavy
- dark or aggressive by default

---

## Brand Positioning

### Product Character
Libra Colf is operational software for domestic work management. The product helps families, CAFs, and studios manage recurring obligations with less friction and less risk.

The interface should communicate:
- reliability over novelty
- clarity over density
- guidance over jargon
- control without intimidation

### Visual Personality
- Base mood: light, ordered, trustworthy
- Primary visual cue: structured blue
- Secondary mood: soft document/workflow aesthetics
- Emotional tone: reassuring, not promotional

---

## Core Design Principles

### 1. Clarity First
Information hierarchy must be immediately readable. Primary headings, actions, and status labels should always be obvious within the first scan.

### 2. Soft Precision
Rounded corners, soft shadows, and pale surfaces should reduce tension, but layouts must still feel exact and disciplined.

### 3. Blue As Authority
Blue is the main identity signal. It should be used with restraint and confidence, not sprayed across the UI.

### 4. High Trust, Low Noise
Avoid gimmicks: excessive glow, gradients without purpose, animated decoration, noisy iconography, and visual clutter.

### 5. Product-Led Proof
Where possible, use real UI previews, real workflow language, and realistic examples instead of abstract marketing visuals.

---

## Typography

### Font Stack
- Headings: `Manrope`
- Body/UI: `Inter`

This is already implemented in [app/layout.tsx](/Users/salvatore.viscuso/personal/libra-landing/app/layout.tsx).

### Usage Rules

#### Headings
- Use `Manrope` for all `h1` to `h6`
- Heavy weights are preferred for key headings
- Tight tracking is acceptable for display headlines
- Headings should feel compact and intentional

Recommended style:
- `h1`: extra bold, tight line-height, slightly negative letter-spacing
- `h2`: extra bold or bold, compact line-height
- `h3`: bold, cleaner and less compressed than hero lines

#### Body Copy
- Use `Inter`
- Maintain relaxed line-height for explanatory copy
- Avoid overly small text for critical information
- Paragraphs should remain easy to scan, especially in modals and forms

Recommended body rhythm:
- Main body: `15px` to `18px`
- Secondary body: `14px` to `16px`
- Microcopy: `12px` to `14px`

### Tone in Copy
Copy should sound:
- direct
- helpful
- practical
- concrete

Copy should avoid:
- hype
- exaggerated urgency
- abstract slogans without operational meaning

---

## Color System

### Primary Palette
Defined in [tailwind.config.ts](/Users/salvatore.viscuso/personal/libra-landing/tailwind.config.ts).

- `primary`: `#0b3b88`
- `ink`: `#0f172a`
- `muted`: `#5f6b84`
- `surface`: `#f5f7fb`
- `line`: `#dbe3f0`
- `emerald`: `#14b86a`

### Extended Practical Palette
Use these as guidance when composing new surfaces:

- Deep brand blue: `#00377e`
- Current system primary: `#0b3b88`
- Heading navy: `#0f1c2c` to `#0f172a`
- Body gray: `#4b5563` to `#5f6b84`
- Soft background blue: `#eef3fa`
- Light section background: `#f9fbff`
- Border gray-blue: `#dbe4f0`
- Success accent: `#14b86a`

### Color Roles

#### Primary Blue
Use for:
- main CTAs
- active states
- key badges
- important highlights
- structured UI accents

Do not use it for:
- every icon
- every border
- full-page saturation without contrast

#### Ink
Use for:
- headlines
- primary text
- high-importance content

#### Muted Gray
Use for:
- explanatory text
- secondary labels
- low-priority metadata

#### Surface / Off-White
Use for:
- cards
- panels
- secondary sections
- modal side panels
- form grouping

#### Emerald
Use sparingly for:
- validation/success
- social proof
- positive completion states

---

## Background System

### Global Page Background
The page background in [app/globals.css](/Users/salvatore.viscuso/personal/libra-landing/app/globals.css) uses:
- light radial blue glow
- light radial green tint
- vertical light gradient

This creates soft atmosphere without turning the page into a flat white canvas.

### Guidance
- Use subtle atmospheric backgrounds behind large sections
- Keep content surfaces white or very pale
- Avoid strong multicolor gradients
- Avoid dark backgrounds except for deliberate CTA blocks or overlays

### Dark / High-Contrast Areas
Use sparingly:
- full-width CTA section
- backdrop overlays
- occasional emphasis sections

Dark surfaces should still feel refined, not harsh.

---

## Spacing and Layout

### Container Widths
- Large content container: `max-w-7xl` or `max-w-[1200px]`
- Reading container: `max-w-3xl`
- Modal width: generally `max-w-5xl`
- Preview surfaces: wide, but never edge-to-edge

### Section Rhythm
Sections should breathe. Prefer generous vertical padding over dense packing.

Recommended cadence:
- small section: `py-16`
- standard section: `py-20`
- major section: `py-24` or larger

### Grid Philosophy
- On desktop, use clear two-column or structured asymmetric layouts
- On mobile, stack cleanly with consistent spacing
- Avoid over-nesting
- Avoid grids that exist only for decoration

---

## Corner Radius

Rounded geometry is part of the Libra Colf language.

### Preferred Radii
- Pills / badges / compact buttons: full radius
- Inputs: full radius or `rounded-2xl`
- Standard cards: `20px` to `24px`
- Feature surfaces / panels: `24px` to `28px`
- Major modals: `28px` to `32px`

### Rule
Corners should feel soft and confident, but not cartoonish.

---

## Shadows

### Existing Shadows
From [tailwind.config.ts](/Users/salvatore.viscuso/personal/libra-landing/tailwind.config.ts):
- `soft`: `0 24px 80px rgba(15, 23, 42, 0.10)`
- `card`: `0 24px 64px rgba(11, 59, 136, 0.10)`

### Usage Guidance
- Use shadows to lift important surfaces
- Prefer large, diffused shadows over hard dark ones
- Keep small controls low-shadow or shadowless
- Do not stack glow + border + heavy shadow on the same component without reason

### Avoid
- bright neon glows
- high-contrast drop shadows
- pulse + glow + badge combinations unless there is a real behavioral reason

---

## Borders and Lines

Borders are important in this system. They create structure without requiring heavy fill.

### Border Color
- Default: `#dbe3f0` / `#dbe4f0`
- Active / selected: tinted primary
- Minimal dividers: light gray-blue at low opacity

### Use Borders For
- cards
- input fields
- segmented controls
- preview frames
- secondary buttons

---

## Buttons

### Primary Button
Use for the main action in a given area.

Characteristics:
- filled blue background
- white text
- strong weight
- rounded corners or pill shape
- minimal but present shadow

Examples of use:
- book demo
- submit
- download guide

### Secondary Button
Use for alternate navigation or lower-priority action.

Characteristics:
- white or pale surface
- blue or ink text
- visible border
- quieter than primary

### Text / Link Action
Use for:
- dismissal
- secondary navigation
- continuation actions

### CTA Rules
- each section should have one clearly dominant CTA
- avoid two equally loud primary buttons unless intentionally paired
- “Prenota demo” should always mean booking, not scrolling
- navigation links and conversion actions must remain semantically distinct

---

## Forms

Forms should feel calm and approachable, especially for non-technical users.

### Input Style
- white background
- light border
- pill or soft rounded rectangle shape
- medium text size
- obvious focus ring in tinted primary

### Labels
- visible above fields
- semibold, but not too dark
- compact spacing between label and input

### Textareas
- larger radius than browser default
- generous internal padding
- enough height to feel usable immediately

### Error and Success States
- errors: clear text, not overly alarming
- success: calm confirmation, often with emerald accent

### Form Writing
Labels and placeholders should be practical:
- “Nome”
- “Cognome”
- “Email”
- “Telefono”
- “Raccontaci il tuo caso”

Avoid vague labels like:
- “Messaggio”
- “Scrivici”
unless context makes them unambiguous

---

## Modals

Modals are a major part of the current landing experience. They must follow a single visual language.

### Modal Principles
- centered white card
- large radius
- dark overlay with blur
- clear close affordance
- one dominant action
- strong title hierarchy

### Layout Pattern
Best default:
- left: persuasive framing / benefits / reassurance
- right: form or primary interaction

### Overlay
- dark tint around `bg-black/60`
- `backdrop-blur-md`

### Animation
- scale-up on enter
- subtle fade
- no theatrical motion

### Focus and Accessibility
Every modal must:
- trap focus
- restore focus on close
- support `Escape`
- support overlay dismissal where appropriate

---

## Cards and Panels

### Card Language
Cards should feel:
- light
- structured
- slightly elevated

### Common Card Recipe
- white or pale background
- subtle border
- soft shadow
- large radius
- moderate internal padding

### When Not to Use a Card
Do not put everything inside a box. Large sections should sometimes breathe on the page without another nested card.

---

## Product Screenshots and Previews

The product is a core trust signal. Screenshots should be treated carefully.

### Rules
- use real screenshots whenever possible
- frame them within a soft device/window surface
- keep crops intentional
- avoid tiny screenshots inside oversized decorative boxes

### Preferred Behavior
- stable preview frame size
- consistent ratio per section
- product UI should be readable at first glance
- labels should help orient the user, not compete with the screenshot

### Do Not
- let screenshot frames jump in size between slides
- use excessive overlays on top of screenshots
- shrink screenshots too much in the name of padding

---

## Iconography

### Style
- Lucide-style line icons fit the product well
- use clean stroke icons
- keep stroke width visually consistent

### Usage
- icons should support scanning
- icons should not replace hierarchy
- avoid decorative icon overload

### Good Icon Roles
- feature bullets
- status cues
- directional hints
- lightweight metadata

---

## Motion

Motion should clarify, not entertain.

### Approved Motion Language
- fade in
- scale up slightly
- spring expand for accordion/content reveal
- controlled slide transitions in previews

### Existing Direction
Framer Motion usage across the app already follows this pattern:
- short duration
- clean easing
- natural spring for expansion

### Avoid
- infinite decorative animation unless it has UX value
- strong pulsing on CTAs by default
- bouncing UI that implies urgency without reason

---

## Navigation

### Top Navbar
The navbar should remain concise.

Current structure:
- Come funziona
- Per chi è
- Prezzi
- Demo
- FAQ

### Navigation Rules
- top nav is for orientation
- conversion CTA should remain visually separate from nav links
- active states should be subtle but noticeable

### Footer
The footer should:
- help users revisit key sections
- reinforce trust
- avoid dead links

---

## Content Components

### Hero
The hero should communicate:
- what the product is
- who it is for
- what outcome it creates

The hero should not rely on vague emotional positioning alone.

### FAQ
FAQ should be:
- narrow enough to read comfortably
- quiet in style
- operational in tone

### Chatbot / Guided Assistant
If present, it should be framed as guided selection or qualification, not fake support, unless it truly is support.

### Exit-Intent Modal
This is a rescue layer, not a separate funnel. It must remain simpler and lighter than the main booking flow.

### Demo Section
The demo section is:
- a preview
- a persuasion layer
- a bridge to booking

It is not a second form destination.

---

## Email Design Guidelines

The current email previews should be redesigned under the same system.

### Email Should Feel Like
- a clean extension of the landing
- simple
- premium
- helpful

### Email Layout Guidance
- strong blue header block
- large but controlled heading
- one dominant CTA
- one or two summary blocks
- restrained footer information

### Email Must Avoid
- generic SaaS newsletter look
- too much empty space
- tiny body type
- overuse of boxes inside boxes

### Email Content Pattern
1. clear subject + preheader
2. concise confirmation or delivery message
3. one CTA
4. two short “what’s inside / what happens next” blocks
5. quiet compliance footer

---

## Voice and Microcopy

### Tone Attributes
- clear
- concrete
- reassuring
- operational

### Recommended Language Pattern
- explain the next step
- state what the user gets
- reduce uncertainty

### Examples
Good:
- “Prenota una demo gratuita”
- “Compila il form e ti contatteremo”
- “Ricevi un promemoria prima di ogni scadenza”

Less good:
- “Scopri la rivoluzione”
- “Sblocca il potenziale”
- “Parla con noi”

---

## Accessibility Rules

Every new UI surface should respect:
- visible focus states
- readable contrast
- semantic headings
- labeled form fields
- keyboard accessibility
- meaningful dismiss controls

For overlays and modals:
- trap focus
- close on `Escape`
- restore focus after close

---

## Implementation Reference

### Current Tokens
See:
- [tailwind.config.ts](/Users/salvatore.viscuso/personal/libra-landing/tailwind.config.ts)
- [app/globals.css](/Users/salvatore.viscuso/personal/libra-landing/app/globals.css)
- [app/layout.tsx](/Users/salvatore.viscuso/personal/libra-landing/app/layout.tsx)

### Core Components That Define the Current Language
Use these as implementation references:
- [components/hero.tsx](/Users/salvatore.viscuso/personal/libra-landing/components/hero.tsx)
- [components/demo-booking-modal.tsx](/Users/salvatore.viscuso/personal/libra-landing/components/demo-booking-modal.tsx)
- [components/demo-section.tsx](/Users/salvatore.viscuso/personal/libra-landing/components/demo-section.tsx)
- [components/faq-section.tsx](/Users/salvatore.viscuso/personal/libra-landing/components/faq-section.tsx)
- [components/engagement-modal.tsx](/Users/salvatore.viscuso/personal/libra-landing/components/engagement-modal.tsx)

---

## Practical Do / Don’t

### Do
- use blue with discipline
- keep sections airy
- prefer real screenshots over abstract illustration
- use Manrope for hierarchy and Inter for clarity
- design for families and professionals who are not payroll experts
- make every CTA semantically clear

### Don’t
- add glow effects to compensate for weak hierarchy
- over-animate buttons
- create competing conversion paths with conflicting semantics
- use placeholder legal links
- turn every section into the same generic SaaS card
- let decorative styling reduce readability

---

## Decision Standard

When unsure between two UI options, choose the one that is:
1. clearer
2. calmer
3. more operational
4. more consistent with the blue/white Libra Colf language
5. easier to maintain across landing, modal, and email surfaces

