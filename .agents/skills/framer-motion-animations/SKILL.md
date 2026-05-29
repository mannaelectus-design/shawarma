---
name: framer-motion-animations
description: Create scroll-triggered and entrance animations using Framer Motion (motion package). Use when adding animations, implementing scroll reveals, or migrating from CSS/Intersection Observer.
allowed-tools: Read, Edit, Write, Grep, Glob
---

# Framer Motion Animations Skill

This skill helps you implement consistent, accessible animations across the codebase using Framer Motion (motion package v12+).

## When to Use This Skill

- Adding scroll-triggered reveal animations
- Implementing entrance/exit animations
- Creating staggered list animations
- Migrating from CSS/Intersection Observer to Motion
- Ensuring accessibility with reduced motion support

## Key Files

| File | Purpose |
|------|---------| 
| `src/components/variants.ts` | Shared animation variants |
| `src/components/animated-number.tsx` | Number animation component |

## Animation Variants

### Standard Variants (in `variants.ts`)

```typescript
import type { Variants } from "framer-motion";

// Base fade-in-up animation for section content
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Container variant for staggered children
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Individual stagger item
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

// Hero entrance animation (faster, more dramatic)
export const heroEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
```

## Usage Patterns

### 1. Scroll-Triggered Animation (Single Element)

```typescript
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUpVariants } from "./variants";

export const Section = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : fadeInUpVariants}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Content */}
    </motion.div>
  );
};
```

### 2. Staggered List Animation

```typescript
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "./variants";

export const FeatureGrid = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="grid grid-cols-2 gap-6"
      variants={shouldReduceMotion ? undefined : staggerContainerVariants}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {features.map((feature) => (
        <motion.div
          key={feature.id}
          variants={shouldReduceMotion ? undefined : staggerItemVariants}
        >
          {/* Feature card */}
        </motion.div>
      ))}
    </motion.div>
  );
};
```

### 3. Entrance Animation (No Scroll Trigger)

```typescript
import { motion, useReducedMotion } from "framer-motion";

export const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const entranceTransition = (delay: number) =>
    shouldReduceMotion
      ? undefined
      : { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.h1
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={entranceTransition(0.15)}
    >
      Headline
    </motion.h1>
  );
};
```

### 4. Index-Based Stagger (Manual Delays)

```typescript
import { motion, useReducedMotion } from "framer-motion";

interface TimelineItemProps {
  index: number;
}

const TimelineItem = ({ index }: TimelineItemProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={
        shouldReduceMotion
          ? undefined
          : { duration: 0.5, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }
      }
    >
      {/* Content */}
    </motion.div>
  );
};
```

## Accessibility

**Always use `useReducedMotion()`** to respect user preferences:

```typescript
import { useReducedMotion } from "framer-motion";

const Component = () => {
  const shouldReduceMotion = useReducedMotion();
  // When reduced motion is preferred, pass undefined to variants/initial/transition
};
```

## When to Use CSS vs Motion

| Use Case | Recommendation |
|----------|----------------|
| Scroll-triggered reveals | Motion (`whileInView`) |
| Entrance animations | Motion (`initial`/`animate`) |
| Staggered lists | Motion (`staggerChildren`) |
| Hover states | CSS (`transition-*`) |
| Infinite loops | CSS keyframes |
| Simple state transitions | CSS (`transition-all`) |

## Easing Functions

| Name | Value | Use Case |
|------|-------|----------|
| Smooth decelerate | `[0.16, 1, 0.3, 1]` | Hero entrances, dramatic reveals |
| Standard ease | `[0.4, 0, 0.2, 1]` | General purpose animations |

## Viewport Options

```typescript
viewport={{
  once: true,      // Only animate once (recommended)
  amount: 0.2,     // Trigger when 20% visible
}}
```

## Validation Checklist

When implementing animations:

- [ ] Uses `useReducedMotion()` for accessibility
- [ ] Passes `undefined` to variants/initial/transition when reduced motion preferred
- [ ] Uses shared variants from `variants.ts` where applicable
- [ ] Uses `viewport={{ once: true }}` for scroll-triggered animations
- [ ] Keeps hover states as CSS transitions (not Motion)
- [ ] Uses CSS keyframes for infinite/background animations
