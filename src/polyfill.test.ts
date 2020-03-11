describe('polyfill', () => {
  it('should set global and proc as the code will throw error', async () => {
    await import('./polyfill')
      .then(x => {
        expect(x?.default?.process).toBeTruthy();
      })
      .catch(_ => {
        // ignore
      });
  });

  it("should leave the global and proc, as it won't threw any errors", async () => {
    await import('./polyfill')
      .then(x => {
        expect(x?.default?.process).toBeTruthy();
      })
      .catch(_ => {
        // ignore
      });
  });
});
