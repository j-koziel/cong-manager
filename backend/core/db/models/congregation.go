package models

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"math/rand"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type InformationBoardItem struct {
	gorm.Model
	Type    string `json:"type"`
	Summary string `json:"summary"`

	CongregationID *uint `json:"congregationId"`
}

type CongregationPhone struct {
	Ext   string `json:"ext"`
	Phone string `json:"phone"`
}

type Congregation struct {
	gorm.Model

	// Database ID
	ID uint `json:"id" gorm:"primarykey"`

	// Unique signature for matching meeting-finder
	// i.e. someone creates a duplicate congregation
	// but some may have the same address or name
	// A matching signature tells us it exists already
	Signature string `json:"signature" gorm:"unique"`

	Name    string `json:"name"`
	Address string `json:"address"`

	// Location of the congregation/meeting
	Lat string `json:"lat"`
	Lon string `json:"lon"`

	// Should not be modified/retrieved directly. Only through GetPhones/SetPhones
	PhoneNumbers datatypes.JSON `json:"phoneNumbers"`

	Users            []User                 `json:"users" gorm:"foreignKey:CongregationID"`
	InformationBoard []InformationBoardItem `json:"informationBoard" gorm:"foreignKey:CongregationID"`
}

func (congregation *Congregation) SetPhones(phones []CongregationPhone) error {
	bytes, err := json.Marshal(phones)
	if err != nil {
		return err
	}

	congregation.PhoneNumbers = datatypes.JSON(bytes)
	return nil
}

func (congregation *Congregation) GetPhones() ([]CongregationPhone, error) {
	var phones []CongregationPhone
	err := json.Unmarshal(congregation.PhoneNumbers, &phones)

	return phones, err
}

func (congregation *Congregation) GenerateSignature() {
	/* Generate a new deterministic signature for a UNIQUE congregation in-place */

	hasher := sha256.New()
	var buffer bytes.Buffer

	buffer.WriteString(congregation.Name)
	buffer.WriteString(congregation.Address)

	hasher.Write(buffer.Bytes())
	congregation.Signature = hex.EncodeToString(hasher.Sum(nil))
}

type CongregationVerificationCode struct {
	gorm.Model

	// Database ID
	ID uint `json:"id" gorm:"primarykey"`

	Code        string `json:"-"`
	PhoneNumber string `json:"phoneNumber"`

	// Corresponding signature
	CongregationSignature string `json:"signature"`
}

func (verificationCode *CongregationVerificationCode) RandomVerificationCode() {
	code := fmt.Sprintf("%04d", rand.Intn(10000))
	verificationCode.Code = code
}
