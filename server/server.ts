import App from './src/app';

export const PORT = process.env.PORT || 8081;

App.listen(PORT, () => {
    console.log('App started up');
});
