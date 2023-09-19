<template>
  <div id="app" class="default-layout">
    <h1>Demo site</h1>

    <nav>
      <ul>
        <li>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">
            About
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact">
            Contact
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <slot />
  </div>
</template>
