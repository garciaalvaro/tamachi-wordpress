<?php

namespace TAMACHI;

get_header();

if ( have_posts() ) {

	while ( have_posts() ) {

		the_post();

		$post_id   = get_the_ID();
		$ancestors = Utils::getPostAncestors( $post_id );
		$next      = Utils::getPostNext( $post_id );

		?>

		<article id="tamachi-post">

			<div id="tamachi-post-header">

				<?php
				if ( ! empty( $ancestors ) ) {

					set_query_var( 'tamachi-breadcrumbs-items', $ancestors );

					get_template_part( 'template-parts/breadcrumbs' );
				}
				?>

				<h1 id="tamachi-post-title">

					<a id="tamachi-post-link" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
				</h1>
			</div>

			<div id="tamachi-post-content"><?php the_content(); ?></div>

			<?php if ( ! empty( $next ) ) { ?>

			<div id="tamachi-navigation-next">

				<span id="tamachi-navigation-next-label"><?php echo esc_attr__( 'Next', 'tamachi' ); ?></span>

				<a id="tamachi-navigation-next-link" href="<?php echo esc_url( $next['url'] ); ?>"><?php
					echo esc_attr( $next['title'] );
				?></a>

			</div>

			<?php } ?>

		</article>

		<?php
	}
}

get_sidebar();
get_footer();
