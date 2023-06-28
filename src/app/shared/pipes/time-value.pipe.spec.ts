import { TimeValuePipe } from './time-value.pipe';

describe('TimeValuePipe', () => {
  it('create an instance', () => {
    const pipe = new TimeValuePipe();
    expect(pipe).toBeTruthy();
  });
});
