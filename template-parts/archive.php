<?php

namespace TAMACHI;

?>

<div id="tamachi-archive">

	<?php if ( have_posts() ) { ?>

		<?php while ( have_posts() ) { ?>

			<?php the_post(); ?>

			<article class="tamachi-post">

				<a href="<?php the_permalink(); ?>" class="tamachi-post-link">

					<h3 class="tamachi-post-title"><?php the_title(); ?></h3>

					<?php if ( ! empty( get_the_excerpt() ) ) { ?>

						<div class="tamachi-post-excerpt"><?php the_excerpt(); ?></div>

					<?php } ?>
				</a>
			</article>

		<?php } ?>

	<?php } else { ?>

		<div class="tamachi-no_results">

			<span class="tamachi-no_results-title"><?php echo esc_attr( 'Nothing Found.', 'tamachi' ); ?></span>

			<span class="tamachi-no_results-content"><?php

				if ( is_search() ) {

					echo esc_attr( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'tamachi' );

				} else {

					echo esc_attr( 'It seems we can&rsquo;t find what you&rsquo;re looking for.', 'tamachi' );

			?></span>

			<?php } ?>

		</div>

	<?php } ?>

</div>
