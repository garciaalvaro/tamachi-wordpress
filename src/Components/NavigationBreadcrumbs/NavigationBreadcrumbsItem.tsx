import { A, Li, Span } from "utils/Components";
import { useLoadPage } from "hooks";

interface Props extends Item {
	use_span?: true;
}

export const NavigationBreadcrumbsItem: React.ComponentType<Props> = props => {
	const { title, url, use_span } = props;
	const loadPage = useLoadPage();

	return (
		<Li>
			{url && !use_span ? (
				<A
					href={url}
					onClick={(e: React.MouseEvent) => {
						if (e.shiftKey || e.ctrlKey || e.metaKey) return;

						e.preventDefault();

						loadPage(url, true);
					}}
				>
					{title}
				</A>
			) : (
				<Span>{title}</Span>
			)}
		</Li>
	);
};
