module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    important: true,
    theme: {
        extend: {
            colors: {
                primary: '#4303d5'
            },
            flex: {
                2: '2 2 0%'
            },
          backgroundImage: {
            'audio': "url('/img/background-audio.jpg')",
          }
        }
    },
    variants: {
        extend: {
            scale: ['active', 'group-hover'],
            borderWidth: ['hover', 'focus']
        }
    },
    plugins: []
}
