module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true, // Ensure source maps are enabled
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // Enable source maps in sass-loader as well
            },
          },
        ],
      },
    ],
  },
  