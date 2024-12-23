import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { PostService } from './Services/post.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'details/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const post = inject(PostService);
      const ids = await post.getPosts();
      return ids.map((id) => ({ id}));
    },
    fallback: PrerenderFallback.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
