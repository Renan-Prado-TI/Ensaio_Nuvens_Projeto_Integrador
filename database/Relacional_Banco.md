# User
- ID
- Name
- CPF
- Password
- Phone
- Email
- Address_ID
- Address_Number
- Manager (Boolean)
- Musician (Boolean)
- Status (Boolean)

# Address
- ID
- Type (Rua, Avenida, Rodovia)
- Street
- Complement
- Zip Code
- City
- State

# Band
- ID
- Name
- Address_ID
- Address_Number
- Logo (.png)
- Phone
- Manager (User_ID)

# Instrument
- ID
- Name

# Musician_Skill
- ID
- User_ID
- Band_ID
- Instrument_ID
- Priority (1, 2, 3, 4, 5)

# Song
- ID
- Name
- Grid (.pdf)
- YouTube_Link
- MP3 (.mp3)

# Score
- ID
- Song_ID
- Instrument_ID
- Class (1st, 2nd, 3rd, 4th, 5th)

# Score_Band
- ID
- Score_ID
- Band_ID
- Status (Boolean)

# Annotation
- ID
- Type
- Description
- Time
- Location
- Event_Date
- Band_ID
- Creation_Date

Address 1:N User
Address 1:N Band
Track 1:N User (Manager)
User 1:N Skill_Musician (Musician)
Skill_Musician 1:N Band
Instrument 1:N Skill_Musician
Instrument 1:N Score
Score 1:N Score_Band
Band 1:N Score_Band
Song 1:N Score