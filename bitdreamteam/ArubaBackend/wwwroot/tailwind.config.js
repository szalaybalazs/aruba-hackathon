tailwind.config = {}

module.exports = {
    theme: {
      extend: {
        colors: {
          bitblue: '#12B0B0',
        },
      },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
  }
  

