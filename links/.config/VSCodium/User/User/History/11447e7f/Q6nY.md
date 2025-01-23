---
lastModified: 08-25-2024
---

# Usage

To use math notation, you need to wrap the expressions in `$` signs. For inline math like $f(x) = x^2$ (inline), only one dollar sign is enough. For displaying an expression as a centered block you can wrap it with two `$`.


# Exemples

## Inline maths

```md
$f(x) = x^2$
```
$f(x) = x^2$

---

## Math block

```md
$$
f(x) = x^2
$$
```
$$
f(x) = x^2
$$

---

## Notations in a sentence

```md
Lift($$L$$) can be determined by Lift Coefficient ($$C_L$$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$
```

Lift($$L$$) can be determined by Lift Coefficient ($$C_L$$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

---

```markdown
$$\begin{array}{c}

\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &
= \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\

\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\

\nabla \cdot \vec{\mathbf{B}} & = 0

\end{array}$$
```

$$\begin{array}{c}

\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &
= \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\

\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\

\nabla \cdot \vec{\mathbf{B}} & = 0

\end{array}$$

---

## Matrix

```md
$$
\begin{matrix}
   a & b \\
   c & d
\end{matrix}
$$
```

$$
\begin{matrix}
   a & b \\
   c & d
\end{matrix}
$$


$$
% \f is defined as #1f(#2) using the macro
\f\relax{x} = \int_{-\infty}^\infty
\f\hat\xi\,e^{2 \pi i \xi x}
\,d\xi
$$
