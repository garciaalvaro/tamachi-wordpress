import { ContextViewProvider } from "./ContextView";
import { ContextScriptsProvider } from "./ContextScripts";
import { ContextContentProvider } from "./ContextContent";
import { ContextSidebarProvider } from "./ContextSidebar";

interface Props {
	children: React.ReactElement;
}

export const Context: React.ComponentType<Props> = props => {
	return (
		<ContextViewProvider>
			<ContextScriptsProvider>
				<ContextSidebarProvider>
					<ContextContentProvider>
						{props.children}
					</ContextContentProvider>
				</ContextSidebarProvider>
			</ContextScriptsProvider>
		</ContextViewProvider>
	);
};
