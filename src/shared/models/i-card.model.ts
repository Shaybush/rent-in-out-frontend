import { IUserModel } from './i-user.model';

interface Image {
	url: string;
	img_id: string;
	_id: string;
}

interface ICollectPoints {
	_id: string;
	x: number;
	y: number;
	label: string;
}

interface ProfileImage {
	url: string;
	img_id: string;
	_id: string;
}

interface Creator {
	fullName: {
		firstName: string;
		lastName: string;
	};
	_id: string;
	email: string;
	phone: string;
	country: string;
	city: string;
	createdAt: number;
	profile_img: ProfileImage;
}

export interface ICardPropsModel {
	_id: string;
	title: string;
	info: string;
	img: Image[];
	range: 'long-term' | 'short-term';
	creator_id: string;
	category_url: string;
	price: number;
	type: 'rent' | 'exchange' | 'delivery';
	collect_points: ICollectPoints[]; // Adjust the type based on your requirements
	active: boolean;
	available_from: Date;
	country: string;
	city: string;
	likes: IUserModel[];
	createdAt: number | Date;
	updatedAt: number | Date;
}
