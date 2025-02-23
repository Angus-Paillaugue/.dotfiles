/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { CSSProperties, SVGAttributes } from "react";
import { TransformProperties, SVGPathProperties } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion/types";
/**
 * @public
 */
export declare type ResolvedKeyframesTarget = [null, ...number[]] | number[] | [null, ...string[]] | string[];
/**
 * @public
 */
export declare type KeyframesTarget = ResolvedKeyframesTarget | [null, ...CustomValueType[]] | CustomValueType[];
/**
 * @public
 */
export declare type ResolvedSingleTarget = string | number;
/**
 * @public
 */
export declare type SingleTarget = ResolvedSingleTarget | CustomValueType;
/**
 * @public
 */
export declare type ResolvedValueTarget = ResolvedSingleTarget | ResolvedKeyframesTarget;
/**
 * @public
 */
export declare type ValueTarget = SingleTarget | KeyframesTarget;
/**
 * @public
 */
export declare type Props = {
    [key: string]: any;
};
/**
 * A function that accepts a progress value between `0` and `1` and returns a
 * new one.
 *
 * @library
 *
 * ```jsx
 * const transition = {
 *   ease: progress => progress * progress
 * }
 *
 * <Frame
 *   animate={{ opacity: 0 }}
 *   transition={transition}
 * />
 * ```
 *
 * @motion
 *
 * ```jsx
 * <MotionDiv
 *   animate={{ opacity: 0 }}
 *   transition={{
 *     duration: 1,
 *     ease: progress => progress * progress
 *   }}
 * />
 * ```
 *
 * @public
 */
export declare type EasingFunction = (v: number) => number;
/**
 * The easing function to use. Set as one of:
 *
 * - The name of an in-built easing function.
 * - An array of four numbers to define a cubic bezier curve.
 * - An easing function, that accepts and returns a progress value between `0` and `1`.
 *
 * @public
 */
export declare type Easing = [number, number, number, number] | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | EasingFunction;
/**
 * Options for orchestrating the timing of animations.
 *
 * @public
 */
export interface Orchestration {
    /**
     * Delay the animation by this duration (in seconds). Defaults to `0`.
     *
     * @remarks
     * ```javascript
     * const transition = {
     *   delay: 0.2
     * }
     * ```
     *
     * @public
     */
    delay?: number;
    /**
     * Describes the relationship between the transition and its children. Set
     * to `false` by default.
     *
     * @remarks
     * When using variants, the transition can be scheduled in relation to its
     * children with either `"beforeChildren"` to finish this transition before
     * starting children transitions, `"afterChildren"` to finish children
     * transitions before starting this transition.
     *
     * @motion
     *
     * ```jsx
     * const list = {
     *   hidden: {
     *     opacity: 0,
     *     transition: { when: "afterChildren" }
     *   }
     * }
     *
     * const item = {
     *   hidden: {
     *     opacity: 0,
     *     transition: { duration: 2 }
     *   }
     * }
     *
     *  <Motion let:motion={ul} variants={list} animate="hidden">
     *    <ul use:ul>
     *      <Motion let:motion variants={item}>
     *        <li use:motion />
     *      </Motion>
     *      <Motion let:motion variants={item}>
     *        <li use:motion />
     *      </Motion>
     *     </ul>
     *   </Motion>
     * )
     * ```
     *
     * @public
     */
    when?: false | "beforeChildren" | "afterChildren" | string;
    /**
     * When using variants, children animations will start after this duration
     * (in seconds). You can add the `transition` property to both the `Frame` and the `variant` directly. Adding it to the `variant` generally offers more flexibility, as it allows you to customize the delay per visual state.
     *
     * @motion
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       delayChildren: 0.5
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     *  <Motion let:motion={ul}
     *      variants={container}
     *      initial="hidden"
     *      animate="show">
     *    <ul use:ul>
     *      <Motion let:motion variants={item}>
     *        <li use:motion />
     *      </Motion>
     *      <Motion let:motion variants={item}>
     *        <li use:motion />
     *      </Motion>
     *     </ul>
     *   </Motion>
     * ```
     *
     * @public
     */
    delayChildren?: number;
    /**
     * When using variants, animations of child components can be staggered by this
     * duration (in seconds).
     *
     * For instance, if `staggerChildren` is `0.01`, the first child will be
     * delayed by `0` seconds, the second by `0.01`, the third by `0.02` and so
     * on.
     *
     * The calculated stagger delay will be added to `delayChildren`.
     *
     * @motion
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       staggerChildren: 0.5
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     * return (
     *  <Motion let:motion={ul}
     *      variants={container}
     *      initial="hidden"
     *      animate="show">
     *    <ol use:ul>
     *      <Motion let:motion variants={item}>
     *        <li use:motion />
     *      </Motion>
     *      <Motion let:motion variants={item}>
     *        <li use:motion />
     *      </Motion>
     *     </ol>
     *   </Motion>
     * )
     * ```
     *
     * @public
     */
    staggerChildren?: number;
    /**
     * The direction in which to stagger children.
     *
     * A value of `1` staggers from the first to the last while `-1`
     * staggers from the last to the first.
     *
     * @motion
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       delayChildren: 0.5,
     *       staggerDirection: -1
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     *   <Motion let:motion={ul}
     *      variants={container}
     *      initial="hidden"
     *      animate="show">
     *      <ul use:ul>
     *        <Motion let:motion
     *          variants={item}
     *          size={50}/>
     *              <li use:motion/>
     *        </Motion>
     *        <Motion let:motion
     *          variants={item}
     *          size={50}/>
     *              <li use:motion/>
     *        </Motion>*
     *      </ul>
     * </Motion>
     * ```
     *
     * @public
     */
    staggerDirection?: number;
}
export interface Repeat {
    /**
     * The number of times to repeat the transition. Set to `Infinity` for perpetual repeating.
     *
     * Without setting `repeatType`, this will loop the animation.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ repeat: Infinity, duration: 2 }}
     * />
     * ```
     *
     * @public
     */
    repeat?: number;
    /**
     * How to repeat the animation. This can be either:
     *
     * "loop": Repeats the animation from the start
     *
     * "reverse": Alternates between forward and backwards playback
     *
     * "mirror": Switches `from` and `to` alternately
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{
     *     repeat: 1,
     *     repeatType: "reverse",
     *     duration: 2
     *   }}
     * />
     * ```
     *
     * @public
     */
    repeatType?: "loop" | "reverse" | "mirror";
    /**
     * When repeating an animation, `repeatDelay` will set the
     * duration of the time to wait, in seconds, between each repetition.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ repeat: Infinity, repeatDelay: 1 }}
     * />
     * ```
     *
     * @public
     */
    repeatDelay?: number;
}
/**
 * An animation that animates between two or more values over a specific duration of time.
 * This is the default animation for non-physical values like `color` and `opacity`.
 *
 * @public
 */
export interface Tween extends Repeat {
    /**
     * Set `type` to `"tween"` to use a duration-based tween animation.
     * If any non-orchestration `transition` values are set without a `type` property,
     * this is used as the default animation.
     *
     * @motion
     *
     * ```jsx
     * <Motion let:motion isSVG={true}
     *   animate={{ pathLength: 1 }}
     *   transition={{ duration: 2, type: "tween" }}>
     *  <path use:motion/>
     * </Motion>     *
     * />
     * ```
     *
     * @public
     */
    type?: "tween";
    /**
     * The duration of the tween animation. Set to `0.3` by default, 0r `0.8` if animating a series of keyframes.
     *
     * @motion
     *
     * ```jsx
     * const variants = {
     *   visible: {
     *     opacity: 1,
     *     transition: { duration: 2 }
     *   }
     * }
     * ```
     *
     * @public
     */
    duration?: number;
    /**
     * The easing function to use. Set as one of the below.
     *
     * - The name of an existing easing function.
     *
     * - An array of four numbers to define a cubic bezier curve.
     *
     * - An easing function, that accepts and returns a value `0-1`.
     *
     * If the animating value is set as an array of multiple values for a keyframes
     * animation, `ease` can be set as an array of easing functions to set different easings between
     * each of those values.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ opacity: 0 }}
     *   transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
     * />
     * ```
     *
     * @public
     */
    ease?: Easing | Easing[];
    /**
     * The duration of time already elapsed in the animation. Set to `0` by
     * default.
     *
     * @internal
     */
    elapsed?: number;
    /**
     * When animating keyframes, `times` can be used to determine where in the animation each keyframe is reached.
     * Each value in `times` is a value between `0` and `1`, representing `duration`.
     *
     * There must be the same number of `times` as there are keyframes.
     * Defaults to an array of evenly-spread durations.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ scale: [0, 1, 0.5, 1] }}
     *   transition={{ times: [0, 0.1, 0.9, 1] }}
     * />
     * ```
     *
     * @public
     */
    times?: number[];
    /**
     * When animating keyframes, `easings` can be used to define easing functions between each keyframe. This array should be one item fewer than the number of keyframes, as these easings apply to the transitions between the keyframes.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ backgroundColor: ["#0f0", "#00f", "#f00"] }}
     *   transition={{ easings: ["easeIn", "easeOut"] }}
     * />
     * ```
     *
     * @public
     */
    easings?: Easing[];
    /**
     * The value to animate from.
     * By default, this is the current state of the animating value.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ from: 90, duration: 2 }}
     * />
     * ```
     *
     * @public
     */
    from?: number | string;
    /**
     * @internal
     */
    to?: number | string | ValueTarget;
    /**
     * @internal
     */
    velocity?: number;
    /**
     * @internal
     */
    delay?: number;
}
/**
 * An animation that simulates spring physics for realistic motion.
 * This is the default animation for physical values like `x`, `y`, `scale` and `rotate`.
 *
 * @public
 */
export interface Spring extends Repeat {
    /**
     * Set `type` to `"spring"` to animate using spring physics for natural
     * movement. Type is set to `"spring"` by default.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring' }}
     * />
     * ```
     *
     * @public
     */
    type: "spring";
    /**
     * Stiffness of the spring. Higher values will create more sudden movement.
     * Set to `100` by default.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', stiffness: 50 }}
     * />
     * ```
     *
     * @public
     */
    stiffness?: number;
    /**
     * Strength of opposing force. If set to 0, spring will oscillate
     * indefinitely. Set to `10` by default.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', damping: 300 }}
     * />
     * ```
     *
     * @public
     */
    damping?: number;
    /**
     * Mass of the moving object. Higher values will result in more lethargic
     * movement. Set to `1` by default.
     *
     * @motion
     *
     * ```jsx
     * <motion.feTurbulence
     *   animate={{ baseFrequency: 0.5 } as any}
     *   transition={{ type: "spring", mass: 0.5 }}
     * />
     * ```
     *
     * @public
     */
    mass?: number;
    /**
     * The duration of the animation, defined in seconds. Spring animations can be a maximum of 10 seconds.
     *
     * If `bounce` is set, this defaults to `0.8`.
     *
     * Note: `duration` and `bounce` will be overridden if `stiffness`, `damping` or `mass` are set.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ x: 100 }}
     *   transition={{ type: "spring", duration: 0.8 }}
     * />
     * ```
     *
     * @public
     */
    duration?: number;
    /**
     * `bounce` determines the "bounciness" of a spring animation.
     *
     * `0` is no bounce, and `1` is extremely bouncy.
     *
     * If `duration` is set, this defaults to `0.25`.
     *
     * Note: `bounce` and `duration` will be overridden if `stiffness`, `damping` or `mass` are set.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ x: 100 }}
     *   transition={{ type: "spring", bounce: 0.25 }}
     * />
     * ```
     *
     * @public
     */
    bounce?: number;
    /**
     * End animation if absolute speed (in units per second) drops below this
     * value and delta is smaller than `restDelta`. Set to `0.01` by default.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', restSpeed: 0.5 }}
     * />
     * ```
     *
     * @public
     */
    restSpeed?: number;
    /**
     * End animation if distance is below this value and speed is below
     * `restSpeed`. When animation ends, spring gets “snapped” to. Set to
     * `0.01` by default.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', restDelta: 0.5 }}
     * />
     * ```
     *
     * @public
     */
    restDelta?: number;
    /**
     * The value to animate from.
     * By default, this is the initial state of the animating value.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', from: 90 }}
     * />
     * ```
     *
     * @public
     */
    from?: number | string;
    /**
     * @internal
     */
    to?: number | string | ValueTarget;
    /**
     * The initial velocity of the spring. By default this is the current velocity of the component.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', velocity: 2 }}
     * />
     * ```
     *
     * @public
     */
    velocity?: number;
    /**
     * @internal
     */
    delay?: number;
}
/**
 * An animation that decelerates a value based on its initial velocity,
 * usually used to implement inertial scrolling.
 *
 * Optionally, `min` and `max` boundaries can be defined, and inertia
 * will snap to these with a spring animation.
 *
 * This animation will automatically precalculate a target value,
 * which can be modified with the `modifyTarget` property.
 *
 * This allows you to add snap-to-grid or similar functionality.
 *
 * Inertia is also the animation used for `dragTransition`, and can be configured via that prop.
 *
 * @public
 */
export interface Inertia {
    /**
     * Set `type` to animate using the inertia animation. Set to `"tween"` by
     * default. This can be used for natural deceleration, like momentum scrolling.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ type: "inertia", velocity: 50 }}
     * />
     * ```
     *
     * @public
     */
    type: "inertia";
    /**
     * A function that receives the automatically-calculated target and returns a new one. Useful for snapping the target to a grid.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   drag
     *   dragTransition={{
     *     power: 0,
     *     // Snap calculated target to nearest 50 pixels
     *     modifyTarget: target => Math.round(target / 50) * 50
     *   }}
     * />
     * ```
     *
     * @public
     */
    modifyTarget?(v: number): number;
    /**
     * If `min` or `max` is set, this affects the stiffness of the bounce
     * spring. Higher values will create more sudden movement. Set to `500` by
     * default.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   drag
     *   dragTransition={{
     *     min: 0,
     *     max: 100,
     *     bounceStiffness: 100
     *   }}
     * />
     * ```
     *
     * @public
     */
    bounceStiffness?: number;
    /**
     * If `min` or `max` is set, this affects the damping of the bounce spring.
     * If set to `0`, spring will oscillate indefinitely. Set to `10` by
     * default.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   drag
     *   dragTransition={{
     *     min: 0,
     *     max: 100,
     *     bounceDamping: 8
     *   }}
     * />
     * ```
     *
     * @public
     */
    bounceDamping?: number;
    /**
     * A higher power value equals a further target. Set to `0.8` by default.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   drag
     *   dragTransition={{ power: 0.2 }}
     * />
     * ```
     *
     * @public
     */
    power?: number;
    /**
     * Adjusting the time constant will change the duration of the
     * deceleration, thereby affecting its feel. Set to `700` by default.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   drag
     *   dragTransition={{ timeConstant: 200 }}
     * />
     * ```
     *
     * @public
     */
    timeConstant?: number;
    /**
     * End the animation if the distance to the animation target is below this value, and the absolute speed is below `restSpeed`.
     * When the animation ends, the value gets snapped to the animation target. Set to `0.01` by default.
     * Generally the default values provide smooth animation endings, only in rare cases should you need to customize these.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   drag
     *   dragTransition={{ restDelta: 10 }}
     * />
     * ```
     *
     * @public
     */
    restDelta?: number;
    /**
     * Minimum constraint. If set, the value will "bump" against this value (or immediately spring to it if the animation starts as less than this value).
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   drag
     *   dragTransition={{ min: 0, max: 100 }}
     * />
     * ```
     *
     * @public
     */
    min?: number;
    /**
     * Maximum constraint. If set, the value will "bump" against this value (or immediately snap to it, if the initial animation value exceeds this value).
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   drag
     *   dragTransition={{ min: 0, max: 100 }}
     * />
     * ```
     *
     * @public
     */
    max?: number;
    /**
     * The value to animate from. By default, this is the current state of the animating value.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   drag
     *   dragTransition={{ from: 50 }}
     * />
     * ```
     *
     * @public
     */
    from?: number | string;
    /**
     * The initial velocity of the animation.
     * By default this is the current velocity of the component.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'inertia', velocity: 200 }}
     * />
     * ```
     *
     * @public
     */
    velocity?: number;
    /**
     * @internal
     */
    delay?: number;
}
/**
 * Keyframes tweens between multiple `values`.
 *
 * These tweens can be arranged using the `duration`, `easings`, and `times` properties.
 *
 * @internalremarks
 * We could possibly make the `type` property redundant, if not for all animations
 * then for this one quite easily.
 *
 * @internal
 */
export interface Keyframes {
    /**
     * Set `type` to `"keyframes"` to animate using the keyframes animation.
     * Set to `"tween"` by default. This can be used to animate between a series of values.
     *
     * @public
     */
    type: "keyframes";
    /**
     * An array of values to animate between.
     *
     * @internal
     */
    values: KeyframesTarget;
    /**
     * An array of numbers between 0 and 1, where `1` represents the `total` duration.
     *
     * Each value represents at which point during the animation each item in the animation target should be hit, so the array should be the same length as `values`.
     *
     * Defaults to an array of evenly-spread durations.
     *
     * @public
     */
    times?: number[];
    /**
     * An array of easing functions for each generated tween, or a single easing function applied to all tweens.
     *
     * This array should be one item less than `values`, as these easings apply to the transitions *between* the `values`.
     *
     * ```jsx
     * const transition = {
     *   backgroundColor: {
     *     type: 'keyframes',
     *     easings: ['circIn', 'circOut']
     *   }
     * }
     * ```
     *
     * @public
     */
    ease?: Easing | Easing[];
    /**
     * Popmotion's easing prop to define individual easings. `ease` will be mapped to this prop in keyframes animations.
     *
     * @internal
     */
    easings?: Easing | Easing[];
    /**
     * @internal
     */
    elapsed?: number;
    /**
     * The total duration of the animation. Set to `0.3` by default.
     *
     * ```jsx
     * const transition = {
     *   type: "keyframes",
     *   duration: 2
     * }
     *
     * <MotionDiv
     *   animate={{ opacity: 0 }}
     *   transition={transition}
     * />
     * ```
     *
     * @public
     */
    duration?: number;
    /**
     * @public
     */
    repeatDelay?: number;
    /**
     * @internal
     */
    from?: number | string;
    /**
     * @internal
     */
    to?: number | string | ValueTarget;
    /**
     * @internal
     */
    velocity?: number;
    /**
     * @internal
     */
    delay?: number;
}
/**
 * @internal
 */
export interface Just {
    type: "just";
    to?: number | string | ValueTarget;
    from?: number | string;
    delay?: number;
    velocity?: number;
}
/**
 * @public
 */
export interface None {
    /**
     * Set `type` to `false` for an instant transition.
     *
     * @public
     */
    type: false;
    /**
     * @internal
     */
    from?: number | string;
    /**
     * @internal
     */
    delay?: number;
    /**
     * @internal
     */
    velocity?: number;
}
/**
 * @public
 */
export declare type PopmotionTransitionProps = Tween | Spring | Keyframes | Inertia | Just;
/**
 * @public
 */
export declare type PermissiveTransitionDefinition = {
    [key: string]: any;
};
/**
 * @public
 */
export declare type TransitionDefinition = Tween | Spring | Keyframes | Inertia | Just | None | PermissiveTransitionDefinition;
export declare type TransitionMap = Orchestration & {
    [key: string]: TransitionDefinition;
};
/**
 * Transition props
 *
 * @public
 */
export declare type Transition = (Orchestration & Repeat & TransitionDefinition) | (Orchestration & Repeat & TransitionMap);
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
declare type CSSPropertiesWithoutTransitionOrSingleTransforms = Omit<CSSProperties, "transition" | "rotate" | "scale" | "perspective">;
declare type TargetProperties = CSSPropertiesWithoutTransitionOrSingleTransforms & SVGAttributes<SVGElement> & TransformProperties /*& CustomStyles*/ & SVGPathProperties;
/**
 * @public
 */
export declare type MakeCustomValueType<T> = {
    [K in keyof T]: T[K] | CustomValueType;
};
/**
 * @public
 */
export declare type Target = MakeCustomValueType<TargetProperties>;
/**
 * @public
 */
export declare type MakeKeyframes<T> = {
    [K in keyof T]: T[K] | T[K][] | [null, ...T[K][]];
};
/**
 * @public
 */
export declare type TargetWithKeyframes = MakeKeyframes<Target>;
/**
 * An object that specifies values to animate to. Each value may be set either as
 * a single value, or an array of values.
 *
 * It may also option contain these properties:
 *
 * - `transition`: Specifies transitions for all or individual values.
 * - `transitionEnd`: Specifies values to set when the animation finishes.
 *
 * ```jsx
 * const target = {
 *   x: "0%",
 *   opacity: 0,
 *   transition: { duration: 1 },
 *   transitionEnd: { display: "none" }
 * }
 * ```
 *
 * @public
 */
export declare type TargetAndTransition = TargetWithKeyframes & {
    transition?: Transition;
    transitionEnd?: Target;
};
export declare type TargetResolver = (custom: any, current: Target, velocity: Target) => TargetAndTransition;
/**
 * @public
 */
export declare type Variant = TargetAndTransition | TargetResolver;
/**
 * @public
 */
export declare type Variants = {
    [key: string]: Variant;
};
/**
 * @public
 */
export interface CustomValueType {
    mix: (from: any, to: any) => (p: number) => number | string;
    toValue: () => number | string;
}
export {};
