<template>
  <div class="h-screen w-full bg-gray-50 flex items-center justify-center">
    <div class="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
      <div class="w-full lg:w-1/2 mx-8">
        <div class="text-8xl text-indigo-600 font-dark font-extrabold mb-8">404</div>
        <p class="text-2xl md:text-3xl font-light leading-normal mb-8">
          Lo siento que no hemos podido encontrar la página que buscas.
        </p>

        <RouterLink to="/"
          class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-indigo-600 hover:bg-indigo-800">Volver
          a la página de inicio</RouterLink>
      </div>
      <div class="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
        <img src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
          class="" alt="Page not found">
      </div>

    </div>
  </div>
</template>
