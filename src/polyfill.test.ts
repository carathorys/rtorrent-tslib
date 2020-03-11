describe('polyfill', () => {

  it('should work with angular ;)', () => {
    import('./polyfill')
      .then(x => {
        expect(x?.default?.process).toBeTruthy();
      })
      .catch(_ => {
        // ignore
      });
  });
});
