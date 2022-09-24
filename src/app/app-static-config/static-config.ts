export class StaticConfig {

  public static lanCodeList = ['en', 'ln1', 'ln2'];

  public static lanMap = {
    en: {
      code: 'en',
      lanKey: 'en',
      paramExtKey: '',
      value: 'English',
      text: 'English',
      dir: 'ltr'
    },
    si: {
      code: 'si',
      lanKey: 'ln1',
      paramExtKey: '_ln1',
      value: 'Sinhala',
      text: 'සිංහල',
      dir: 'ltr'
    },
    ta: {
      code: 'ta',
      lanKey: 'ln2',
      paramExtKey: '_ln2',
      value: 'Tamil',
      text: 'தமிழ்',
      dir: 'ltr'
    }
  };

  public static webChannel = 2;
  public static responseSuccessStatus = 1;

}
