interface IMailConfig {
  driven: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driven: process.env.MAIL_DRIVEN || 'ethereal',

  defaults: {
    from: {
      email: '', // from configure address in amazon SES
      name: '',
    },
  },
} as IMailConfig;
