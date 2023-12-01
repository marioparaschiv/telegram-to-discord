import sourcemaps from 'source-map-support';
sourcemaps.install();

import { Client, Webhook } from '@structures/index';
import config from '@config';

Client.initialize();

if (config.errors.catch) {
	process.on('uncaughtException', (error, origin) => {
		Webhook.send(config.errors.webhook, {
			content: [
				'**An error occured inside telegram-to-discord**',
				'',
				`Origin: \`${origin ?? 'Unknown'}\``,
				`Cause: \`${error.cause ?? 'Unknown'}\``,
				`Type: \`${error.name}\``,
				`Stack: \`\`\`\n${error.stack}\n\`\`\``,
			].join('\n')
		});
	});
}