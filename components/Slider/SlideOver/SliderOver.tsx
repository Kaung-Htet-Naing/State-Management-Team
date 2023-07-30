import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

type SlideOverProps = {
	open: boolean;
	setOpen: (v: boolean) => void;
	children: React.ReactNode;
};

export default function SlideOver({ open, setOpen, children }: SlideOverProps) {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<div className="fixed inset-0" />
				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="w-screen max-w-xl pointer-events-auto">
									<div className="flex flex-col h-full py-6 overflow-y-scroll shadow-xl bg-slate-400">
										{children}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
