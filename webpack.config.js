'use strict';

import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  entry: {
    bundle: [path.join(process.cwd(), 'source/client')]
  },
  output: {
    path: path.join(process.cwd(), 'public/client'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.ProvidePlugin({ $: 'jquery' }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                    importSource: '@emotion/react'
                  }
                ]
              ],
              plugins: ['@emotion/babel-plugin']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor.bundle'
        }
      }
    }
  },
  devServer: {
    hot: true,
    liveReload: true,
    proxy: { '*': 'http://localhost:3000' }
  },
  resolve: {
    alias: {
      client: path.join(process.cwd(), 'source/client')
    }
  }
};
