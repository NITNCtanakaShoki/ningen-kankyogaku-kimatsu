import { data } from '$lib/data';

const key = 'quiz_id_data';

export class QuizIdStorage {
	findOrSetIds(): readonly string[] {
		const json = localStorage.getItem(key);
		if (json == null) {
			return this.reset();
		}
		return JSON.parse(json);
	}

	queueFirst(): readonly string[] {
		const json = this.findOrSetIds();
		if (json.length === 0) return [];
		const next = json.slice(1).concat([json[0]]);
		localStorage.setItem(key, JSON.stringify(next));
		return next;
	}

	dropFirst(): readonly string[] {
		const json = this.findOrSetIds();
		if (json.length === 0) return [];
		const next = json.slice(1);
		localStorage.setItem(key, JSON.stringify(next));
		return next;
	}

	reset(): readonly string[] {
		const next = data.map((d) => d.id);
		localStorage.setItem(key, JSON.stringify(next));
		return next;
	}
}
