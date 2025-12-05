# Replacing Redux

- remove Redux and its libraries
- use React's context and useState instead

## Relevant files

- src/ducks/discs.ts
- src/ducks/images.ts
- src/App.test.tsx
- src/index.tsx
- src/app/hooks.ts
- src/app/store.ts
- src/components/containers/DiscGalleryContainer.tsx
- src/components/containers/layouts/AppLayoutContainer.tsx
-



## Plan

- verify that React's context is a valid choice
- present a plan on how to replace Redux


## Claude's response

I've analyzed your Redux implementation and created a comprehensive migration plan. Here's my assessment:

✅ React Context is a VALID Choice

Why it works for your application:
- Primarily UI-focused state (form data, loading states)
- Straightforward CRUD operations without complex orchestration
- Limited cross-component state sharing (mostly parent-to-child)
- Manageable application size (41 TypeScript files)
- Only 2 Redux slices (discs, images) with 7 async operations total

Migration Strategy: 4 Specialized Contexts

Rather than one monolithic context, I recommend splitting into focused contexts for better performance:

1. DiscsContext - Disc list & pagination

- Manages gallery disc list, filters, pagination
- Used by: DiscGalleryPage, DiscGallery

2. DiscFormContext - Single disc editing

- Manages current disc being edited/created
- Handles saved state, savedDiscId
- Used by: AddDiscPage, EditDiscPage, DiscForm

3. ReferenceDataContext - Static reference data

- Manufacturers, materials, stats with 24hr localStorage cache
- Used by: AppLayout → Navigation, DiscForm, Filter

4. ImageUploadContext - Image uploads

- Manages uploaded image IDs
- Used by: ImageUpload, DiscForm

Migration Plan Summary

Phase 1: Setup (4-5 hours)
- Create 4 context providers with TypeScript types
- Implement useAsync hook (replaces createAsyncThunk)
- Copy localStorage caching logic from Redux thunks

Phase 2: Nest Providers (1 hour)
- Set up provider hierarchy in index.tsx
- Keep Redux temporarily alongside contexts

Phase 3: Migrate Components (8-10 hours)
Migration order (leaf-first):
1. ImageUpload (30 min)
2. Filter (30 min)
3. DiscForm (2 hours - most complex)
4. EditDiscPage (1 hour)
5. AddDiscPage (1 hour)
6. DiscGalleryPage (2 hours)
7. Remove Redux connect() HOCs (1 hour)

Phase 4: Remove Redux (1 hour)
- Delete Redux files and dependencies
- Remove <Provider> wrapper

Phase 5: Testing (2-3 hours)
- Full functional testing
- Performance profiling
- Error handling verification

Key Implementation Details

Replacing createAsyncThunk

// Custom hook pattern
const { loading, error, execute } = useAsync<ResultType>();

const fetchDiscs = useCallback(async (params) => {
const result = await execute(() => discApi.getDiscs(params));
if (result) setDiscs(result.discs);
}, [execute]);

LocalStorage Caching

Copy existing cache logic from discs.ts lines 191-245:
- 24-hour cache for stats and reference data
- Invalidate on add/update operations

Cross-Context Communication

When disc is saved (DiscFormContext), invalidate cache (ReferenceDataContext):
const { invalidateCache } = useReferenceData();
await addNewDisc(data, token);
invalidateCache(); // Refresh stats after save

Performance Considerations

Optimization strategies:
- Split context values with useMemo to prevent unnecessary re-renders
- ReferenceDataContext at top level (loaded once, shared globally)
- Use separate state/actions contexts if needed

Estimated Timeline

Total: 16-20 hours (conservative)
- Can be reduced to 10-12 hours if you're familiar with Context API

Would you like me to start implementing this migration? I can begin with Phase 1 (creating the context providers) or answer any
questions about the plan first.
