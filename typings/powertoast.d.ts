interface PowertoastParams {
    title: string;
    message: string;
    icon: string;
    audio?: string;
}

function PowertoastFunc(param: PowertoastParams): Promise<void>;

declare var powertoast: PowertoastFunc;

declare module "powertoast" {
	export = powertoast
}
