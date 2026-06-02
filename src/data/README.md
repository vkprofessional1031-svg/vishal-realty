# How to Add a New Property

To add new property listings to the website in the future:

1. **Open the Data File**: Open `src/data/properties.json`.
2. **Copy & Paste**: Copy any existing property JSON object block and paste it at the end of the list (ensure proper comma separators in the JSON array).
3. **Update Fields**: Update all fields with the details of the new property:
   - `id`: Increment to a new unique number.
   - `title`: Posh name of the property.
   - `type`: Must be one of `Apartment`, `Villa`, `Plot`, or `Commercial`.
   - `status`: Must be one of `For Sale`, `For Rent`, or `For Lease`.
   - `locality`: Posh Chennai locality (e.g., `Adyar`, `OMR`, `ECR`, `Besant Nagar`, `Thiruvanmiyur`).
   - `address`: Detailed street address.
   - `price`: Clean formatted price (e.g., `₹2.85 Crore` or `₹75,000 / Month`).
   - `area`: Size in square feet as a pure number.
   - `bhk`: Number of bedrooms as a number (use `null` for plots/commercial spaces if not applicable).
   - `floor`: Description of building level (use `null` or appropriate text).
   - `furnished`: `Fully Furnished`, `Semi-Furnished`, or `Unfurnished`.
   - `parking`: Description of available parking slots (e.g., `2 Covered`, `Open`).
   - `facing`: Vastu/cardinal direction (e.g., `East`, `North`, `South`, `West`, `North-East`).
   - `image`: Relative filename (e.g., `/properties/my-new-villa.jpg`).
   - `featured`: `true` to highlight, otherwise `false`.
   - `description`: Engaging description paragraph.
   - `highlights`: Array of short selling points (e.g. `["Prime Locality", "Metro Water"]`).
4. **Add Photo**: Place the property photo in the `/public/properties/` folder.
5. **Update Image Field**: Set the `"image"` field in `properties.json` to match the exact filename of the photo you placed in `/public/properties/` (e.g., `/properties/my-new-villa.jpg`).
6. **Save**: Save both files. The website's listings will update automatically!
